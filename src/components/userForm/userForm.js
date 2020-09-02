import React from "../../../node_modules/react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Logo from "../../static/images/Logo.png";
import "./styles/UserForm.css";

function UserForm(props) {
  return (
    <div>
      <div className="text-center">
        <img className="logo" src={Logo} alt="logo" />
      </div>
      <div>
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
