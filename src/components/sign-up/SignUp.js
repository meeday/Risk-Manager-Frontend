import React from "react";
import "./style.css";

class CreateLogin extends React.Component {
  
     state = {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: [
        "Engineer",
        "Project Manager",
        "Architect/Design",
        "Supervisor/Foreman",
        "Risk Advisory",
        "Safety Manager",
      ],
      company: "",
      password: "",
      confirmPassword: "",
    };
    passwordChangeHandler = this.passwordChangeHandler.bind(this);
    confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(
      this
    );
    createClickHandler = this.createClickHandler.bind(this);
    handleChange = this.handleChange.bind(this);
  
  passwordChangeHandler(event) {
    const element = event.target;
    const password = element.value;
    element.classList.remove("low", "medium", "high");

    if (password.length >= 12) {
      element.classList.add("high");
    } else if (password.length >= 9) {
      element.classList.add("medium");
    } else if (password.length > 6) {
      element.classList.add("low");
    }

    const confirmPasswordElement = document.getElementById("confirmPassword");
    if (password === confirmPasswordElement.value) {
      confirmPasswordElement.classList.remove("high");
      confirmPasswordElement.classList.add("high");
    } else {
      confirmPasswordElement.classList.remove("high");
      confirmPasswordElement.classList.add("low");
    }

    this.handleChange(event);
  }

  confirmPasswordChangeHandler(event) {
    const element = event.target;
    const confirmPassword = element.value;
    const password = document.getElementById("password").value;
    element.classList.remove("low", "high");

    if (confirmPassword !== password && password.length !== 0) {
      element.classList.add("low");
    } else if (password.length !== 0) {
      element.classList.add("high");
    }

    this.handleChange(event);
  }
  createClickHandler(event) {
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      company,
      password,
      confirmPassword,
    } = this.state;
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      jobTitle,
      company,
      password,
      confirmPassword,
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  // signInTransition(event) {
  //   event.preventDefault();
  //   const container = document.querySelector(".container");
  //   const signInBtn = document.getElementById("signIn");
  //   const selection = event.target.id;
  //   if (selection === signInBtn) {
  //     container.classList.remove("right-panel-active");
  //   }
  // }

  // signUpTransition(event) {
  //   event.preventDefault();
  //   const container = document.querySelector(".container");
  //   const signUpBtn = document.getElementById("signUp");
  //   const selection = event.target.id;
  //   if (selection === signUpBtn) {
  //     container.classList.add("right-panel-active");
  //   }
  // }

  render() {
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      company,
      password,
      confirmPassword,
    } = this.state;
    return (
      <div className="container right-panel-active">
        <div className="container__form container--signin">
          <form action="#" className="form" id="form2">
            <img
              id="avatar"
              src="https://www.iconninja.com/files/522/684/984/men-person-human-male-users-account-people-man-profile-avatar-user-icon.png"
              alt="avatar"
            />
            <h2 className="form__title">Sign In</h2>
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button  id="signIn" className="btn">
              Sign In
            </button>
          </form>
        </div>

        <div className="container__form container--signup">
          <form action="#" className="form" id="form1">
            <h2 className="form__title">Sign Up</h2>
            <input
              type="text"
              placeholder="First Name"
              className="input"
              value={firstName}
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input"
              value={lastName}
              onChange={this.handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={this.handleChange}
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={this.passwordChangeHandler}
            />
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="input"
              value={confirmPassword}
              onChange={this.confirmPasswordChangeHandler}
            />
            <input
              type="company"
              placeholder="company"
              className="input"
              value={company}
              onChange={this.handleChange}
            />
            <label>Job Title:</label>
            <select className="input" id="jobTitle" name="jobs">
              <option value={jobTitle[0]}>Engineer</option>
              <option value={jobTitle[1]}>Project Manager</option>
              <option value={jobTitle[2]}>Architect/Design</option>
              <option value={jobTitle[3]}>Supervisor/Foreman</option>
              <option value={jobTitle[4]}>Risk Advisory</option>
              <option value={jobTitle[5]}>Safety Manager</option>
            </select>
            <button  id="signUp" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateLogin;
