import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from "../userForm/image/Logo.png";
import "../dashboard/style/dashboard.css";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <img
        className="navbar-brand"
        src={Logo}
        height={60}
        width={90}
        to={"#"}
      />
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            style={{ color: "#2196f3" }}
            className="nav-link"
            to={"/logout"}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
