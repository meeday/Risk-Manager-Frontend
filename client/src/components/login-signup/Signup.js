import React from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign Up</h3>
      <div className="form-group row">
        <div className="form-group col">
          <label>First name</label>
          <input
            required
            name="firstName"
            type="text"
            className="form-control"
            placeholder="First name"
            ref={register}
          />
        </div>
        <div className="form-group col">
          <label>Last name</label>
          <input
            required
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            ref={register}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          required
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          required
          minLength={6}
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          ref={register}
        />
      </div>
      <div className="form-group row">
        <div className="form-group col">
          <label>Company</label>
          <input
            required
            type="text"
            name="company"
            className="form-control"
            placeholder="Enter Company"
            ref={register}
          />
        </div>
        <div className="form-group col">
          <label>Job Title</label>
          <input
            required
            type="text"
            name="jobTitle"
            className="form-control"
            placeholder="Enter Job Title"
            ref={register}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Sign Up
      </button>
      <div>
        <br />
        <ul className="navbar-nav ml-auto text-right">
          <li className="nav-item">
            <span>Already have an account?</span>
            <Link className="nav-link" to={"/login"}>
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </form>
  );
}
