import gql from 'graphql-tag';

export const QUERY_MOVIES = gql`
  query getMovies($category: ID) {
    movies(category: $category) {
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

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
  }
}
`;