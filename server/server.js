require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { createAuthContext } = require("./utils/auth")
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createAuthContext
});

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(server.getMiddleware({ path: "/graphql" }))
app.use(require('./routes/api'));
const db = require('./config/connections');

// set up Mongoose to connect when we start the app
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/movie-maniac', {
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
