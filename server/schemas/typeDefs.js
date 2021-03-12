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

  type MovieList {
    _id: ID
    movieList: [Movies]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    movieList: [Movies]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    movies(category: ID, name: String): [Movies]
    movie(_id: ID!): Movie
    user: User
    movieList(_id: ID!): MovieList    
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addToWatchList(movies: [ID]!): Movies
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
