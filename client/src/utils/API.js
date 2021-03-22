require('dotenv').config()
// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save movie data for a logged in user
  export const saveMovie = (movieData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieData),
    });
  };
  
  // remove saved movie data for a logged in user
  export const deleteMovie = (movieId, token) => {
    return fetch(`/api/users/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
 
  // make a search to imdb movies api
  // https://www.googleapis.com/movies/v1/volumes?q=harry+potter
  export const searchIMDBMovies = (query) => {
      return fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${query}&page=1&r=json`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": `${process.env.REACT_APP_IMDB_KEY}`,
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
        }
    })
    // return fetch(`'https://www.googleapis.com/movies/v1/volumes?q=${query}`');
  };
  
  