import React from "react";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/signUp";
import "./userForm.css";

class UserForm extends React.Component {
  constructor() {
    super();

    this.state = { form: "login" };

    // I like using objects to toggle values. We could just use true/false and just set to !self value as well.
    this.toggle = {
      login: "register",
      register: "login",
    };
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div
            onSubmit={this.onSubmit.bind(this)}
            style={{
              transform: `translate(${
                this.state.form === "login" ? -50 : 200
              }px, 0px)`,
            }}
            className="form-div"
          >
            {this.state.form === "login" ? <SignIn /> : <SignUp />}
          </div>
          <div className="toggle"
            style={{
              transform: `translate(${
                this.state.form === "login" ? 0 : -300
              }px, 0px)`,
            }}
            className="button-div"
          >
            <p>
              {this.state.form === "login"
                ? "Do not have an account?"
                : "Already a member?"}
            </p>
            <button
              onClick={() => {
                this.setState({ form: this.toggle[this.state.form] });
              }}
            >
              {this.toggle[this.state.form]}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
