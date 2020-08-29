import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../static/images/Logo.png";
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
