import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../login-signup/login.component";
import SignUp from "../login-signup/signup.component";
import Logo from "./image/Logo.png";
import "./userForm.css";

function UserForm() {
  return (
    <Router>
      <div className="container d-block p-1">
        <div className="container d-block p-1">
          <img className="rounded mx-auto d-block p-1" src={Logo} alt="logo" />
          <div className="container d-block p-1">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/sign-in" component={Login} />
                  <Route path="/sign-up" component={SignUp} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default UserForm;
