import React, { Component } from "react";
import "./signUp.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      password: "",
      jobTitle: "",
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        company: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName = value.length <= 0 ? "Input Can't be Empty!" : "";
        break;
      case "lastName":
        errors.lastName = value.length <= 0 ? "Input Can't be Empty!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length <= 6
            ? "Password must be at least 6 characters long!"
            : "";
        break;
      case "company":
        errors.company =
        value.length <=0 ? "Input Can't be Empty!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  render() {
    const {
      errors,
      firstName,
      lastName,
      email,
      company,
      password,
      jobTitle,
    } = this.state;
    return (
        <div className="form-wrapper">
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                noValidate
              />
              {errors.firstName.length > 0 && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                noValidate
              />
              {errors.lastName.length > 0 && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                noValidate
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                noValidate
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="company">
              <label htmlFor="company">Company</label>
              <input
                type="company"
                name="company"
                value={company}
                onChange={this.handleChange}
                noValidate
              />
              {errors.company.length > 0 && (
                <span className="error">{errors.company}</span>
              )}
            </div>
            <div className="jobTitle">
            <label htmlFor="jobTitle">Select Job Title: </label>
                <select name="jobTitle" id="jobTitle" onChange={this.handleChange}>
                  <option value={jobTitle}>Project Manager</option>
                  <option value={jobTitle}>Architect/Design</option>
                  <option value={jobTitle}>Supervisor/Foreman</option>
                  <option value={jobTitle}>Risk Advisory</option>
                  <option value={jobTitle}>Safety Manager</option>
                </select>
              </div>
            <div className="submit">
              <button>Create</button>
            </div>
          </form>
        </div>
    );
  }
}

export default SignUp;
