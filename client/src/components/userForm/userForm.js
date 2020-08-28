import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../login-signup/Login";
import SignUp from "../login-signup/Signup";
import NewProjectAdd from "../newProjectAdd"
import Logo from "./image/Logo.png";
import "./styles/userForm.css";

function UserForm() {
  return (
    <Router>
      <div className="d-block ">
        <div className="text-center">
          <img className="logo" src={Logo} alt="logo" />
        </div>
          <div className="d-block ">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={SignUp} />
                  //<Route exact path="/api/addnewproject" component={NewProjectAdd} />
                </Switch>
              </div>
            </div>
          </div>
        
      </div>
    </Router>
  );
}

export default UserForm;
