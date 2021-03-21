import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $username: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, username: $username) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($movie: MovieInput!) {
    saveMovie(movie: $movie) {
        _id
        username
        email
        movieCount
        savedMovies {
            movieId
            title
            description
            image
            link
        }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId: $movieId) {
        _id
        username
        email
        movieCount
        savedMovies {
            movieId
            title
            description
            image
            link
        }
    }
  }
`;