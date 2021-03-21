import React from "react";
import { Link } from "react-router-dom";
import { useQuery,useMutation } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";
import { removeMovieId } from '../utils/localStorage';
import Auth from '../utils/auth';

const WatchList = () => {
    const { loading,data } = useQuery(QUERY_USER);
    
    const userData = data?.user || {};

    const [removeMovie] = useMutation(REMOVE_MOVIE)
    
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

            </div>

        </>)

};

export default WatchList;
