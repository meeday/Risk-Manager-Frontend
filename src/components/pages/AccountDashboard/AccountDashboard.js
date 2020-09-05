import React, {useState, useEffect} from "react";
import Avatar from "./worker.png";
import AuthService from "../../../Services/AuthService";
import "./styles/AccountDashboard.css";
function AccountDashboard() {
  const [user, setUser] = useState({});
  const [project, setProject] = useState(null);
  const getData = async () => {
    const {data} = await AuthService.getInfo("5f525f4e47672628b097e679");
    setUser(data)
    setProject(data.project.length);
    
  }
  
  
  useEffect(() => {
    getData({});
  }, []);
  
  
  
 
  return (
      <div className="profile">
        <div className="profile__picture">
          <img src={Avatar} alt="avatar" />
        </div>
        <div className="profile__header">
          <div className="profile__account">
  <h4 className="profile__username">{user.firstName}{" "}{user.lastName}</h4>
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
