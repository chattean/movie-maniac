import React, { useState } from 'react';
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Nav from './components/Nav';
// import About from './components/About';
import Movies from './components/Movies';
import ContactForm from './components/Contact';
import store from "./utils/store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Switch, Route } from 'react-router-dom';
import MovieList from './components/MovieList';

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
  const [categories] = useState([
    {
      name: 'Movies',
      description: 'Horror Movies',
    },
    { name: 'horror', description: 'Movies that will keep you up at night' },
    { name: 'comedy', description: 'Movies that hit the funny bone' },
    { name: 'drama', description: 'Movies for the Drama lover in you' },
  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const [contactSelected, setContactSelected] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div>
        <Provider store={store}>
          <Nav
            categories={categories}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
            contactSelected={contactSelected}
            setContactSelected={setContactSelected}
          />

          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>

          <main>
            {!contactSelected ? (
              <>
                <Movies currentCategory={currentCategory}></Movies>
                {/* <About></About> */}
              </>
            ) : (
              <MovieList></MovieList>
            )}
          </main>
        </Provider>
      </div>
    </ApolloProvider>
  );
}

export default App;
