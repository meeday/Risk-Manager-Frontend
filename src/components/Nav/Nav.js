import React, {useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Image from "../../static/images/Logo-Blue.png";
import "./Nav.css";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";


export default function Navbar() {

    const history = useHistory();
    // destructuring AuthProvider values, going to update the new state
    const { isAuthenticated, userInfo, setIsAuthenticated, setUserInfo } = useContext(AuthContext);

    const logoutHandler = async () => {
     const data = await AuthService.logout()
        if (data.success) {
          setUserInfo(data.user);
          setIsAuthenticated(false);

          history.push("/login");
        }
    };
  return (
    <div className="navbar navbar-expand-lg bg-dark fixed-top">
      <Link to={"/"} className="brand">
        <img alt="logo" src={Image} style={{height: `${60}px`}} />
      </Link>
      <div className="nav-right">
        <Link onClick={logoutHandler}>Logout</Link>
      </div>
    </div>
  );
}

