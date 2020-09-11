import React, { useContext } from "react";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";



function Logout(props) {
  // destructuring AuthProvider values, going to update the new state
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const logoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setName(data.user);
        setIsAuthenticated(false);
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
