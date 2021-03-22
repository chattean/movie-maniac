import gql from "graphql-tag";

export const QUERY_MOVIES = gql`
 {
    movies{
      _id
      title
      image
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

export const GET_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      movieCount
      movies {
        movieId
        title
        image
      }
    }
  }
`;
