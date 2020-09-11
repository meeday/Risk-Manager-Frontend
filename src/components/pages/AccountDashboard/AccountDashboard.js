import React, {useState, useEffect, useContext} from "react";
import Avatar from "./worker.png";
import AuthService from "../../../Services/AuthService";
import ProjectService from "../../../Services/ProjectService";
import "./styles/AccountDashboard.css";
import { AuthContext } from "../../../Context/AuthContext";

function AccountDashboard() {

  const [id, setId] = useState(null)
  const authContext = useContext(AuthContext) 
  const projects= ((((authContext || {}).userInfo || {}).user || {}).project || null);

  const Id= (((authContext || {}).userInfo || {}).user || {})._id || null;

  const userRisks = async (id) => {
    try {
      const res = await ProjectService.getRisksByUserId(id); 
    } catch (error) {
      console.log(`Error - AccountDashboard.js - getProjectByUserId() - ${error}`);
    }
  }
  
  useEffect( () =>{
    userRisks(id)
  }, [id, ])
 
  
  
  
  return (
      <div className="profile">
        <div className="profile__picture">
          <img src={Avatar} alt="avatar" />
        </div>
        <div className="profile__header">
          <div className="profile__account">
            <h4 className="profile__username">{((((authContext || {}).userInfo || {}).user || {}).firstName || null)}{" "}{((((authContext || {}).userInfo || {}).user || {}).lastName || null)}</h4>
          </div>
        </div>
        <div className="profile__stats">
          <div className="profile__stat">
            <div className="profile__icon profile__icon--green">
              <i className="material-icons">engineering</i>
            </div>
            <div className="profile__value">
              {projects ? projects.length : 0}
              <div className="profile__key">Projects</div>
            </div>
          </div>
          <div className="profile__stat">
            <div className="profile__icon profile__icon--red">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className="profile__value">
              38
              <div className="profile__key">Issues</div>
            </div>
          </div>
          <div className="profile__stat">
            <div className="profile__icon profile__icon--blue">
              <i className="fas fa-comments"></i>
            </div>
            <div className="profile__value">
              18<div className="profile__key">Comments</div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AccountDashboard;
