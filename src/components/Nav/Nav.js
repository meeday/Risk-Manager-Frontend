import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Image from "../../static/images/Logo-Blue.png";
import "./Nav.css";


export default function Navbar() {
  return (
    <div className="navbar navbar-expand-lg bg-dark fixed-top">
      <Link to={"/"} className="brand">
        <img alt="logo" src={Image} height="60" />
      </Link>
      <div className="nav-right">
        <Link to={"/Logout"}>Logout</Link>
      </div>
    </div>
  );
}

