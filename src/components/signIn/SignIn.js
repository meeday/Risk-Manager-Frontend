import React, { Component } from "react";
import "./signin.css";


class SignIn extends Component {
  

  handleChange = (event) => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      
        <div className="form-wrapper">
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="Email"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="submit">
              <button>Sign In</button>
            </div>
          </form>
        </div>
    );
  }
}

export default SignIn;
