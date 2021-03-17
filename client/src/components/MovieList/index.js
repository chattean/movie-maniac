import React, { useState, useEffect } from 'react';
// import { capitalizeFirstLetter } from '../../utils/helpers';
import { ADD_TO_WATCHLIST } from '../../utils/actions';
// import reducers from "../../utils/reducers"
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { QUERY_MOVIES } from "../../utils/queries";
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_MOVIES } from "../../utils/actions";

// import Movies from "../Movies";

const MovieList = ({ category }) => {

  const [movies] = useState([
    {
      name: 'TheExorcist',
      category: 'horror',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Conjuring',
      category: 'horror',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Shining',
      category: 'horror',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Texas-Chainsaw-Massacre',
      category: 'horror',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Sinister',
      category: 'horror',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Bridesmaids',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Friday',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Ghost-Busters',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Mask',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Godfather',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Shawshank-Redemption',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Forest-Gump',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Green-Mile',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'White-Chicks',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Knives-Out',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },

  ]);

  const currentCategory = movies.filter((movies) => movies.category === category);

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { loading, data } = useQuery(QUERY_MOVIES);

  const {
    _id,
  } = movies;

  const { watchList } = state

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



  const addToWatchList = (movie) => {
    const movieOnList = MovieList.find((movieListItem) => movieListItem._id === _id)
    if (movieOnList) {
      // tell user the movie is already on the list
    } else {
      // not on list put it on the list
      dispatch({
        type: ADD_TO_WATCHLIST,
        movie: { ...movie, addedQuantity: 1 }
      });
      idbPromise('watchList', 'put', { ...movie, addedQuantity: 1 });
    }
  }
  // const { currentCategory } = movies;
  if (!currentCategory) {
    return (
      <div>
        <MovieList />
      </div>

    )
  } else {
    return (
      <div>
        <div className="flex-row space-between" >
          {currentCategory.map((movie, i) => (
            <div>
              <img
                src={require(`../../assets/${category}/${i}.jpg`)}
                alt={movie.name}
                className="img-thumbnail mx-1"
                key={movie.name}
              />
              <div>
                <button onClick={addToWatchList}><span role="img" aria-label="heart">➕ Watch List</span></button>

                <button><span role="img" aria-label="heart">💚</span></button>
              </div>
            </div>
          ))}

        </div>

      </div>
    );
  };
};

export default MovieList;
