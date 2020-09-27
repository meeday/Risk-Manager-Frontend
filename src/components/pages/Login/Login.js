import React, { useState, useContext } from "react";
import Axios from "axios";
import AuthService from "../../../Services/AuthService";
import ProjectService from "../../../Services/ProjectService";
import Toast from "../../Toasts/Toast";
import { UserContext } from "../../../Context/UserContext";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  // Using the useHistory hook for pushing a new route into the history
  const history = useHistory();

  // pull out hooks methods from useForm
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);

  // destructuring Authcontext, we can set new state
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

  const onSubmit = async (user, e) => {
    e.preventDefault();
    const userData = await AuthService.login(user);
    const { userToken, isAuthenticated, userInfo, message } = userData;
    const { firstName, lastName, id, email, project } = userInfo;
    if (isAuthenticated) {
      setUserId(id);
      setUserFName(firstName);
      setUserLName(lastName);
      setUserProjects(project);
      setUserEmail(email);
      
      localStorage.setItem("x-auth-token", userToken);
    //   // If authenticated, use useHistory hook from react-router-dom to redirect to /projects route
      history.push("/home");
    } else {
    //   // this will be an error message telling whats wrong
      setMessage(message);
    }
    const {data} = await Axios({
      method: 'post',
      url: 'https://risk-manager-backend.herokuapp.com/api/user/authenticated',
      headers: {'x-auth-token': userToken}
    });

 
    const RiskData = await ProjectService.getRisksByUserId(data.user._id, userToken)
    setUserRisks(RiskData.data.userRisks);
    const risks = RiskData.data.userRisks;
      let comments = [];
      for (let i = 0; i < risks.length; i++) {
        comments = comments.concat(risks[i].comments);
      }
      setUserComments(comments);
    
    const projectData = await ProjectService.getProjectByUserId(id, userToken)
   
    setUserProjects(projectData.data.usersProjects);
    setProjects(projectData.data.usersProjects.length);
  };
  return (
    <div>
      {message ? <Toast message={message} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            ref={register}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            required
            minLength={6}
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            ref={register}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <div>
          <br />
          <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item">
              <span>Don't have an account? </span>
              <Link className="nav-link" to={"/register"}>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
