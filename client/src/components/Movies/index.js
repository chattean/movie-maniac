import React from 'react';
import MovieList from '../MovieList';

function Movies(movie) {
  const { currentCategory } = movie;
  return (
    <section>

      <MovieList category={currentCategory.name} />

    </section>
  );
}
export default Movies;
