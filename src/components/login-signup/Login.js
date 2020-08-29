import React from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>

      <div className="form-group">
        <label>Email address</label>
        <input
          name="email"
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
  );
}
