const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
// require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes/api'));

// set up Mongoose to connect when we start the app
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/movie-maniac', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

