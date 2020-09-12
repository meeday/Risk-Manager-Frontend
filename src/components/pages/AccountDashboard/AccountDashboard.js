import React, { useState, useEffect, useContext } from "react";
import Avatar from "./worker.png";
import AuthService from "../../../Services/AuthService";
import ProjectService from "../../../Services/ProjectService";
import "./styles/AccountDashboard.css";
import { AuthContext } from "../../../Context/AuthContext";
import { ProjectContext } from "../../../Context/ProjectContext";

function AccountDashboard() {
  const { userValue, authValue, IdValue } = useContext(AuthContext);
  const { userRisks, setUserRisks } = useContext(ProjectContext);
  

  // console.log(projectIdValue.projectId)

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchUser = async () => {
    const { data } = await AuthService.getInfo(IdValue.userId);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setProjects(data.project);
  };

  const fetchRisks = async () => {
    try {
      const { data } = await ProjectService.getRisksByUserId(IdValue.userId);
      setUserRisks(data.userRisks);
    } catch (error) {}
  };

  const numMessage = (risks) => {
    if (risks) {
      let totalComments = 0;
      for (let i = 0; i < risks.length; i++) {
        totalComments += risks[i].comments.length;
      }
      return totalComments;
    }
    return null;
  };
  const numComments = numMessage(userRisks);

  useEffect(() => {
    fetchUser();
    fetchRisks();
    
  }, []);

  return (
    <div className="profile">
      <div className="profile__picture">
        <img src={Avatar} alt="avatar" />
      </div>
      <div className="profile__header">
        <div className="profile__account">
          <h4 className="profile__username">
            {firstName} {lastName}
          </h4>
        </div>
      </div>
      <div className="profile__stats">
        <div className="profile__stat">
          <div className="profile__icon profile__icon--green">
            <i className="material-icons">engineering</i>
          </div>
          <div className="profile__value">
            {projects.length}
            <div className="profile__key">Projects</div>
          </div>
        </div>
        <div className="profile__stat">
          <div className="profile__icon profile__icon--red">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="profile__value">
            {userRisks.length}
            <div className="profile__key">Issues</div>
          </div>
        </div>
        <div className="profile__stat">
          <div className="profile__icon profile__icon--blue">
            <i className="fas fa-comments"></i>
          </div>
          <div className="profile__value">
            {numComments}
            <div className="profile__key">Comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
