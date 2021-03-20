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

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    watchList {
      _id
      
      movies {
        _id
        name
        description
        image
      }
    }
  }
}
`;