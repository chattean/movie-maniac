const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Movie {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Comment {
    _id: ID
    comments: [Movie]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    movieList: [Movie]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    movies(category: ID, name: String): [Movie]
    movie(_id: ID!): Movie
    user: User
    movieList(_id: ID!): [Movie]
    comment: [Comment]    
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, username: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addToWatchList(movies: [ID]!): Movie
    login(email: String!, password: String!): Auth
    addComment(comments: [ID]!): Comment
  }
`;

module.exports = typeDefs;
