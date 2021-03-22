import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [validated] = useState(false);
    const [login] = useMutation(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            const { data } = await login({ variables: { ...formState } });
            const token = data.login.token;
            Auth.login(token);
        } catch (err) {
            console.log(err);
        }

        return (
            <div className="card px-1 py-1">
                <div className="container my-1">
                    <Link to="/signUp">
                        Go SignUp
            </Link>

                    <h2>Login</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex-row space-between my-2">
                            <label htmlFor="email">Email Address:</label>
                            <input
                                placeholder="youremail@email.com"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex-row space-between my-2">
                            <label htmlFor='pwd'>Password:</label>
                            <input
                                placeholder="*******"
                                name="password"
                                type="password"
                                id="pwd"
                                onChange={handleChange}
                            />
                        </div>
                        {
                            error ? <div>
                                <p className="error-text"> incorrect username or password.</p>
                            </div> : null
                        }
                        <div className="flex-row flex-end">
                            <button type="submit">
                                Login
                    </button>
                        </div>
                    </form>
                </div>
            </div>




        );
    }
}

export default Login;
