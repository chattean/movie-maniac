require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const path = require('path');
const { createAuthContext } = require("./utils/auth")
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./config/connections');


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
app.use('/images', express.static(path.join(__dirname, '../client/src/assets/images')));


mongoose.set('debug', true);
if (process.env.NODE_ENV === "production"){
    app.use(express.static('../client/build'))
}
app.get("*",(req, res) => {
    res.sendFile(path.resolve(__dirname,"../client/build/index.html"))
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
