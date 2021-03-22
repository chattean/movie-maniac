import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($movie: [MovieInput!]) {
    saveMovie(movie: $movie) {
      token
      _id
      username
      email
      movieCount
      movies {
        imdbID
        title
        image
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($imdbID: String!) {
    removeMovie(imdbID: $imdbID) {
      _id
      username
      email
      movieCount
      movies {
        imdbID
        title
        image
      }
    }
  }
`;
