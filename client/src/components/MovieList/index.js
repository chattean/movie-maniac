import React, { useEffect } from 'react';
// import { capitalizeFirstLetter } from '../../utils/helpers';
// import { ADD_TO_WATCHLIST } from '../../utils/actions';
// import reducers from "../../utils/reducers"
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { QUERY_MOVIES } from "../../utils/queries";
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_MOVIES } from "../../utils/actions";
import Movies from "../Movies";

function MovieList() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { currentCategory } = state

  const { loading, data } = useQuery(QUERY_MOVIES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_MOVIES,
        movies: data.movies
      });
      data.movies.forEach((movie) => {
        idbPromise('movies', 'put', movie);
      });
    } else if (!loading) {
      idbPromise('movies', 'get').then((movies) => {
        dispatch({
          type: UPDATE_MOVIES,
          movies: movies
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterMovies() {
    if (!currentCategory) {
      return state.movies;
    }

    return state.movies.filter(movies => movies.category._id === currentCategory);
  }

  return (
    <div className="my-2">
    {state.movies.length ? (
      <div className="flex-row">
          {filterMovies().map(movie => (
              <Movies
                key= {movie._id}
                _id={movie._id}
                image={movie.image}
                name={movie.movieTitle}
                
              />
          ))}
      </div>
    ) : (
      <h3>You haven't added any movies yet!</h3>
    )}
   
  </div>
  );
};

export default MovieList;
