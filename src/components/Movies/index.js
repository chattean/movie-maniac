import React from 'react';
import MovieList from '../MovieList';
import { capitalizeFirstLetter } from '../../utils/helpers';

function Gallery(props) {
  const { currentCategory } = props;
  return (
    <section>
      <h1 data-testid="h1tag">{capitalizeFirstLetter(currentCategory.name)}</h1>
      <p>{currentCategory.description}</p>
      <MovieList category={currentCategory.name} />
    </section>
  );
}
export default Gallery;
