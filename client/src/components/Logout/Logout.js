import React, { useContext } from "react";
import AuthService from "../../Services/AuthService";
// import { AuthContext } from "../Context/AuthContext";



function Logout(props) {
  // const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const logoutHandler = () => {
    AuthService.logout().then((data) => {
      console.log(data);
      if (data.success) {
        // setUser(data.user);
        // setIsAuthenticated(false);
        console.log(data.success);
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-link nav-item nav-link"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logout;
