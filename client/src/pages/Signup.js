import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            console.log(formState);
            const mutationResponse = await addUser({
                variables: formState
            });

            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        } catch (err) {
            console.error(err)
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className="card px-1 py-1">
            <div className="container my-1">
                <Link to="/login">
                    Go login
            </Link>
                <h2>Signup</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            placeholder="First Name"
                            name="firstName"
                            id="firstName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            placeholder="Last Name"
                            name="lastName"
                            id="lastName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="firstName">User Name:</label>
                        <input
                            placeholder="Pick a fun user name"
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder="youremail@email.com"
                            name="email"
                            type="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="password">Password:</label>
                        <input
                            placeholder="*****"
                            name="password"
                            type="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row flex-end">
                        <button type="submit">
                            Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;