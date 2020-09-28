import React, { useState, useEffect, useContext } from "react";
import Avatar from "./worker.png";
import "./styles/AccountDashboard.css";
import { UserContext } from "../../../Context/UserContext";

function AccountDashboard() {
  const userContext = useContext(UserContext);
  const {
    userId,
    setUserId,
    userFName,
    setUserFName,
    userLName,
    setUserLName,
    userProjects,
    setUserProjects,
    userEmail,
    setUserEmail,
    userRisks,
    setUserRisks,
    userComments,
    setUserComments,
    projects,
    setProjects,
  } = userContext;
  

  return (
    <div className="profile">
      <div className="profile__picture">
        <img src={Avatar} alt="avatar" />
      </div>
      <div className="profile__header">
        <div className="profile__account">
          <h4 className="profile__username">
          {userFName} {userLName}
          </h4>
        </div>
      </div>
      <div className="profile__stats">
        <div className="profile__stat">
          <div className="profile__icon profile__icon--green">
            <i className="material-icons">engineering</i>
          </div>
          <div className="profile__value">
            {projects ? projects: 0}
            <div className="profile__key">Projects</div>
          </div>
        </div>
        <div className="profile__stat">
          <div className="profile__icon profile__icon--red">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="profile__value">
            {userRisks ? userRisks.length: 0}
            <div className="profile__key">Issues</div>
          </div>
        </div>
        <div className="profile__stat">
          <div className="profile__icon profile__icon--blue">
            <i className="fas fa-comments"></i>
          </div>
          <div className="profile__value">
            {userComments ? userComments.length: 0}
            <div className="profile__key">Comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
