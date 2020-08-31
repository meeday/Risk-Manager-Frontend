import React, { useState, useContext } from "react";
import AuthService from "../../Services/AuthService";
import Message from "../Message/Message";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

export default function Login() {
  // Using the useHistory hook for pushing a new route into the history
  const history = useHistory();

  // pull out hooks methods from useForm
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);
  // destructuring Authcontext, we can set new state
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const onSubmit = (user, e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      // if user authenticated update the state with user info
      if (isAuthenticated) {
        setUser(user);
        setIsAuthenticated(isAuthenticated);
        // If authenticated, use useHistory hook from react-router-dom to redirect to /projects route
        history.push("/projects");
      } else {
        // this will be an error message telling whats wrong
        setMessage(message);
      }
    });
  };

  return (
    <div>
      {message ? <Message message={message} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            name="username"
            type="email"
            className="form-control"
            placeholder="Enter email"
            ref={register}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            required
            minLength={6}
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            ref={register}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <div>
          <br />
          <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item">
              <span>Don't have an account? </span>
              <Link className="nav-link" to={"/register"}>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
