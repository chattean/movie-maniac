import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_WATCHLIST } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function Movies(movieItem) {
  console.log(movieItem);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {
    image,
    name,
    _id,
  } = movieItem;
  console.log(image)
  const { watchList } = state
  const addToWatchList = () => {
    const movieOnList = watchList.find((movieListItem) => movieListItem._id === _id)
    if (movieOnList) {
      console.log("already there")
      // tell user the movie is already on the list
    } else {
      // not on list put it on the list
      dispatch({
        type: ADD_TO_WATCHLIST,
        movie: { ...movieItem, addedQuantity: 1 }
      });
      idbPromise('watchList', 'put', { ...movieItem, addedQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/movies/${_id}`}>
        <img
          alt={name}
          src={`./public/images/${image}`}
        />
        <p>{name}</p>{ }
      </Link>
      <div>
      </div>
      <button onClick={addToWatchList}><span role="img" aria-label="heart">➕ Watch List</span></button>
    </div>
  );
}
export default Movies;
