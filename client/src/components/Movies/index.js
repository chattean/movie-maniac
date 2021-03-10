import React from 'react';
import MovieList from '../MovieList';
import { capitalizeFirstLetter } from '../../utils/helpers';
// import { ADD_TO_WATCHLIST } from '../../utils/actions';

// const addToWatchList = () => {
//   const movieOnList = movieList.find((movieListItem) => movieListItem._id === _id)
//   if (movieOnList) {
//     // tell user the movie is already on the list
//   } else {
//     // not on list put it on the list
// dispatch({
//   type: ADD_TO_WATCHLIST,
//   movie: { ...movie }
// });
//   }
// }

function Movies(props) {
  const { currentCategory } = props;
  return (
    <section>
      <h1 data-testid="h1tag">{capitalizeFirstLetter(currentCategory.name)}</h1>
      <p>{currentCategory.description}</p>
      <MovieList category={currentCategory.name} />
      <button>Add to My Watch List</button>
      {/* // onClick={addToWatchList} add in button> */}
      <button><span role="img" aria-label="heart">💚</span></button>
      {/* add a counter to the heart  */}
    </section>
  );
}
export default Movies;
