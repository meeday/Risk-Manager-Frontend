import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      company: "",
      jobTitle: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>First name</label>
          <input
            required
            name="firstName"
            type="text"
            className="form-control"
            placeholder="First name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            required
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            required
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
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
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            required
            type="company"
            name="company"
            className="form-control"
            placeholder="Enter Company"
            value={this.state.company}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input
            required
            type="jobTitle"
            name="jobTitle"
            className="form-control"
            placeholder="Enter Job Title"
            value={this.state.jobTitle}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <div>
          <br />
          <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item">
              <span>Already have an account?</span>
              <Link className="nav-link" to={"/sign-in"}>
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </form>
    );
  }
}
