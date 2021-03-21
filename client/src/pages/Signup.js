import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  // set initial form state
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);

  const [addUser] = useMutation(ADD_USER);

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
      console.log(formState);
      const { mutationResponse } = await addUser({
        variables: { ...formState },
      });

      const token = mutationResponse.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
    setFormState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="container my-1">
        <Link to="/login">Go login</Link>
        <h2>Signup</h2>
        {/* This is needed for the validation functionality above */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <Form.Group>
              <Form.Label htmlFor="firstName">First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                value={formState.firstName}
                required
              />
              <Form.Control.Feedback type="invalid">
                First Name is required!
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="flex-row space-between my-2">
            <Form.Group>
              <Form.Label htmlFor="lastName">Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                value={formState.lastName}
                required
              />
              <Form.Control.Feedback type="invalid">
                Last Name is required!
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="flex-row space-between my-2">
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your username"
                name="username"
                onChange={handleChange}
                value={formState.username}
                required
              />
              <Form.Control.Feedback type="invalid">
                Username is required!
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="flex-row space-between my-2">
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email address"
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
              disabled={
                !(formState.username && formState.email && formState.password)
              }
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
};

export default Signup;
