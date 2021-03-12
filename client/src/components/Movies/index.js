import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import MovieList from '../MovieList';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { ADD_TO_WATCHLIST } from '../../utils/actions';
// import reducers from "../../utils/reducers"
import { idbPromise } from "../../utils/helpers"



function Movies(movie) {

  // const dispatch = useDispatch();
  // const state = useSelector(state => state);

  // const {
  //   image,
  //   name,
  //   _id,

  // } = movie;

  // const { watchList } = state

  // const addToWatchList = () => {
  //   const movieOnList = MovieList.find((movieListItem) => movieListItem._id === _id)
  //   if (movieOnList) {
  //     // tell user the movie is already on the list
  //   } else {
  //     // not on list put it on the list
  //     dispatch({
  //       type: ADD_TO_WATCHLIST,
  //       product: { ...movie, addedQuantity: 1 }
  //     });
  //     idbPromise('watchlist', 'put', { ...movie, addedQuantity: 1 });
  //   }
  // }


  const { currentCategory } = movie;
  return (
    <section>
      {/* <h1 data-testid="h1tag">{capitalizeFirstLetter(currentCategory.name)}</h1> */}
      {/* <p>{currentCategory.description}</p> */}
      <MovieList category={currentCategory.name} />
      {/* <button onClick={addToWatchList}>Add to Watch List</button> */}

      {/* <button><span role="img" aria-label="heart">💚</span></button> */}
      {/* add a counter to the heart  */}
    </section>
  );
}
export default Movies;
