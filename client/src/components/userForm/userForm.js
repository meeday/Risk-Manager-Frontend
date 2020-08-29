import React from "react";
import Logout from '../Logout/Logout';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../login-signup/Login";
import Register from "../login-signup/Register";
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
                  {/* call the right component according to the end-point */}
                <Route exact path="/" component={Register} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/login" component={Login} />
                  <Route  exact path="/register" component={Register} />
                </Switch>
              </div>
            </div>
          </div>
        
      </div>
    </Router>
  );
}

export default UserForm;
