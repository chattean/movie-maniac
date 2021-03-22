const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # type Category {
  #   _id: ID
  #   name: String
  # }

  type Movie {
    imdbID: String
    title: String
    image: String
  }
  input MovieInput {
    imdbID: String
    title: String
    image: String
  }
  # type Comment {
  #   _id: ID
  #   comments: [Movie]
  # }

  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    movieCount: Int
    movies: [Movie]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me:User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, username: String!): Auth
    # updateUser(firstName: String, lastName: String, email: String, password: String): User
    # addToWatchList(movies: [ID]!): Movie
    login(email: String!, password: String!): Auth
    # addComment(comments: [ID]!): Comment
    saveMovie(movie:MovieInput!): User
    removeMovie(imdbID:String!):User
  }
`;

module.exports = typeDefs;
