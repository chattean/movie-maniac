import gql from 'graphql-tag';

export const QUERY_MOVIES = gql`
  query getMovies($category: ID) {
    products(category: $category) {
      _id
      name
      description
      image
      category {
        _id
      }
    }
  }
`;