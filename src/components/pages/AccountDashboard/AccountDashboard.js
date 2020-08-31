import React from "react";
import Navbar from "../../Nav/Nav";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/AccountDashboard.css";

function AccountDashboard(props) {
  return (
    <>
      <Navbar />
      <div>
        <h1>Account details</h1>
        <h2>Welcome, firstName lastName</h2>
        <p>Job title: ....</p>
        <p>Email: ....</p>
        <p>Company: ....</p>

        <button>
          <a>Edit details</a>
        </button>
      </div>
    </>
  );
}

export default AccountDashboard;
