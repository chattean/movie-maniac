import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function WatchList() {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <>
            <div className="container my-1">
                <Link to="/">
                    Back to Movies
          </Link>

                {user ? (
                    <>
                        <h2> Must Watch for {user.firstName} {user.lastName}</h2>
                        {user.watchList.map((movies) => (
                            <div key={movies._id} className="my-2">

                                <div className="flex-row">
                                    {order.watchList.map(({ _id, image, movieTitle, }, index) => (
                                        <div key={index} className="card px-1 py-1">
                                            <Link to={`/movies/${_id}`}>
                                                <img
                                                    alt={movieTitle}
                                                    src={`/images/${image}`}
                                                />
                                                <p>{movieTitle}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : null}

            </div>

        </>)

};

export default WatchList;
