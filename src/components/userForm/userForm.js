import React from "react";
import Logout from '../Logout/Logout';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../login-signup/Login";
import Register from "../login-signup/Register";
import Logo from "./image/Logo.png";
import "./styles/userForm.css";

function UserForm(props) {
  return (
    <div className="d-block ">
      <div className="text-center">
        <img className="logo" src={Logo} alt="logo" />
      </div>
      <div className="d-block ">
        <div className="auth-wrapper">
          <div className="auth-inner">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
