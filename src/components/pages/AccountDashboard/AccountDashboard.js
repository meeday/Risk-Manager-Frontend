import React, { useState, useEffect, useContext } from "react";
import Avatar from "./worker.png";
import "./styles/AccountDashboard.css";
import { AuthContext } from "../../../Context/AuthContext";
import { UserContext } from "../../../Context/UserContext";

function AccountDashboard() {
  const userContext = useContext(UserContext);
  const project = userContext.projects;

  return (
    <div className="profile">
      <div className="profile__picture">
        <img src={Avatar} alt="avatar" />
      </div>
      <div className="profile__header">
        <div className="profile__account">
          <h4 className="profile__username">
          {userContext.firstName} {userContext.lastName}
          </h4>
        </div>
      </div>
      <div className="profile__stats">
        <div className="profile__stat">
          <div className="profile__icon profile__icon--green">
            <i className="material-icons">engineering</i>
          </div>
          <div className="profile__value">
            {project}
            <div className="profile__key">Projects</div>
          </div>
        </div>
        <div className="profile__stat">
          <div className="profile__icon profile__icon--red">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="profile__value">
            {((userContext || {}).userRisks || []).length}
            <div className="profile__key">Issues</div>
          </div>
        </div>
        <div className="profile__stat">
          <div className="profile__icon profile__icon--blue">
            <i className="fas fa-comments"></i>
          </div>
          <div className="profile__value">
            {(userContext.userComments || []).length}
            <div className="profile__key">Comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
