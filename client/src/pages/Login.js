import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () =>{
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

    setFormState({
        username: "",
        email: "",
        password: "",
      });
  };

  return (
    <>
    <div className="container my-1">
      <Link to="/signUp">Go SignUp</Link>

      <h2>Login</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                  <div className="flex-row space-between my-2">
                  <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleChange}
            value={formState.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>
        </div>
        <div className="flex-row space-between my-2">
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleChange}
            value={formState.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        </div>
        <div className="flex-row flex-end">
        <Button
          disabled={!(formState.email && formState.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
        </div>
      </Form>
    </div>
    </>
  );
}

export default Login;
