import gql from 'graphql-tag';

export const QUERY_MOVIES = gql`
  query getMovies($category: ID) {
    movies(category: $category) {
      _id
      movieTitle
      description
      image
      category {
        _id
      }
    }
  }
`;