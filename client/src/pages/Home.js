import React from "react";
import MovieList from "../components/MovieList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
    return (
        <div className="container">

            <CategoryMenu />
            <MovieList />

        </div>
    );
};

export default Home;
