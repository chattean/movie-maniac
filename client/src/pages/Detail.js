import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
// import { useStoreContext } from "../utils/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import {
    REMOVE_FROM_WATCHLIST,
    ADD_TO_WATCHLIST,
    UPDATE_MOVIES,
} from "../utils/actions";
import { QUERY_MOVIES } from "../utils/queries";
import { idbPromise } from "../utils/helpers";


function Detail() {
    // const [state, dispatch] = useStoreContext();
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const { id } = useParams();

    const [currentMovie, setCurrentMovie] = useState({});

    const { loading, data } = useQuery(QUERY_MOVIES);

    const { movies } = state;

    useEffect(() => {
        // already in global store
        if (movies.length) {
            setCurrentMovie(movies.find(movie => movie._id === id));
        }
        // retrieved from server
        else if (data) {
            dispatch({
                type: UPDATE_MOVIES,
                movies: data.movies
            });

            data.movies.forEach((movie) => {
                idbPromise('movies', 'put', movie);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('movies', 'get').then((indexedMovies) => {
                dispatch({
                    type: UPDATE_MOVIES,
                    movies: indexedMovies
                });
            });
        }
    }, [movies, data, loading, dispatch, id]);

    const addToWatchList = () => {
        const movieOnList = watchList.find((watchListItem) => watchListItem._id === id)
        // how can i rewrite this? i need to alert the user if the movie is already on the watch list
        if (movieOnList) {
            dispatch({
                type: UPDATE_WATCHLIST,
                _id: id,
                addedQuantity: parseInt(movieOnList.addedQuantity) + 1
            });
            idbPromise('watchList', 'put', {
                ...movieOnList,
                addedQuantity: parseInt(movieOnList.addedQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_WATCHLIST,
                movie: { ...currentMovie, addedQuantity: 1 }
            });
            idbPromise('watchList', 'put', { ...currentMovie, addedQuantity: 1 });

        }
    }

    const removeFromWatchList = () => {
        dispatch({
            type: REMOVE_FROM_WATCHLIST,
            _id: currentMovie._id
        });

        idbPromise('watchList', 'delete', { ...currentMovie });
    };

    return (
        <>
            {currentMovie ? (
                <div className="container my-1">
                    <Link to="/">
                        ← Back to Movies
          </Link>

                    <h2>{currentMovie.name}</h2>

                    <p>
                        {currentMovie.description}
                    </p>

                    <p>

                        <button onClick={addToWatchList}>Add to Watch List</button>
                        <button
                            disabled={!watchList.find(p => p._id === currentMovie._id)}
                            onClick={removeFromWatchList}
                        >
                            Remove from Watch List
            </button>
                        <button><span role="img" aria-label="heart">💚</span></button>
                    </p>

                    <img
                        src={`/images/${currentMovie.image}`}
                        alt={currentMovie.name}
                    />
                </div>
            ) : null}
            {
                loading ? <img src={spinner} alt="loading" /> : null
            }
            <ul>
                <li>
                    see comments here
                </li>
            </ul>
        </>
    );
};

export default Detail;
