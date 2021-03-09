import React, { useState } from 'react';
// import Movies from "../Movies";

const MovieList = ({ category }) => {

  const [movies] = useState([
    {
      name: 'TheExorcist',
      category: 'horror ',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Conjuring',
      category: 'horror ',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Shining',
      category: 'horror ',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Texas-Chainsaw-Massacre',
      category: 'horror ',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Sinister',
      category: 'horror ',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Bridesmaids',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Friday',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Ghost-Busters',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Mask',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Godfather',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Shawshank-Redemption',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Forest-Gump',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'The-Green-Mile',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'White-Chicks',
      category: 'comedy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },
    {
      name: 'Knives-Out',
      category: 'drama',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
    },

  ]);

  const currentMovie = movies.filter((movie) => movie.category === category);

  return (
    <div>
      <div className="flex-row">
        {currentMovie.map((movie, i) => (
          <img
            src={require(`../../assets/${category}/${i}.jpg`).default}
            alt={movie.name}
            className="img-thumbnail mx-1"
            key={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
