import React, { useState } from 'react';
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Nav from './components/Nav';
import Movies from './components/Movies';
import store from "./utils/store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchMovies from "./pages/SearchMovies"
import { Switch, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import Detail from "./pages/Detail"

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})



function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Provider store={store}>
          <Nav
          // categories={categories}
          // setCurrentCategory={setCurrentCategory}
          // currentCategory={currentCategory}
          // contactSelected={contactSelected}
          // setContactSelected={setContactSelected}
          />

          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={SearchMovies} />
            <Route exact path="/movies/:id" component={Detail} />
          </Switch>

          {/* <main>
            {!contactSelected ? (
              <>
                <Movies currentCategory={currentCategory}></Movies>
              </>
            ) : (
              <MovieList></MovieList>
            )}
          </main> */}

        </Provider>
      </div>
    </ApolloProvider>
  );
}

export default App;
