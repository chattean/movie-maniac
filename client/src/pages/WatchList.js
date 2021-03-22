import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";
import { removeMovieId } from "../utils/localStorage";
import {
    Container,
    Button,
    Card,
    CardColumns,
  } from "react-bootstrap";
import Auth from "../utils/auth";

const WatchList = () => {
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || {};

//   const [Movie] = useMutation(MOVIE);


  const [removeMovie] = useMutation(REMOVE_MOVIE);

  const handleDeleteMovie = async (imdbID) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await removeMovie({
        variables: { imdbID: imdbID },
      });
      removeMovieId(imdbID);
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">Back to Movies</Link>
      </div>
      <Container>
        <h2>
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved movies!"}
        </h2>
        <CardColumns>
          {userData.savedMovie.map((movie) => {
            return (
              <Card key={movie.imdbID} border="dark">
                {movie.image ? (
                  <Card.Img
                    src={movie.image}
                    alt={`The cover for ${movie.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>

                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteMovie(movie.imdbID)}
                  >
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      {/* 
                { {user ? (
                    <>
                        <h2> Must Watch for {user.firstName} {user.lastName}</h2>
                        {user.watchList.map((movies) => (
                            <div key={movies._id} className="my-2">

                                <div className="flex-row">
                                    {user.watchList.map(({ _id, image, name, }, index) => (
                                        <div key={index} className="card px-1 py-1">
                                            <Link to={`/movies/${_id}`}>
                                                <img
                                                    alt={name}
                                                    src={`/images/${image}`}
                                                />
                                                <p>{name}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (<h3>You haven't added any movies yet!</h3>)
                }

            </div> }  */}
    </>
  );
};

export default WatchList;
