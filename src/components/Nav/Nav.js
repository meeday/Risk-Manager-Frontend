import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Image from "../../static/images/Logo-Blue.png";
import "./Nav.css";

export default function Navbar() {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="navbar navbar-expand-lg bg-dark fixed-top">
      <Link to={"/"} className="brand">
        <img alt="logo" src={Image} style={{ height: `${60}px` }} />
      </Link>
      <div className="nav-right">
        <Link onClick={logoutHandler}>Logout</Link>
      </div>
    </div>
  );
}
