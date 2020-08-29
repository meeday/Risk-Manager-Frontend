import React from "react";
import Nav from "../navbar/nav";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../login-signup/Login";
import SignUp from "../login-signup/Signup";
import "./style/dashboard.css";

export default function userDashboard() {
  return (
    <>
      <Router>
        <div className="d-block wrapper">
          <Nav className="navbar" />

          <div className="auth-inner"></div>
        </div>
      </Router>
    </>
  );
}
