import React, { useState, useContext } from "react";
import AuthService from "../../../Services/AuthService";
import ProjectService from "../../../Services/ProjectService";
import Toast from "../../Toasts/Toast";
import  {AuthContext}  from "../../../Context/AuthContext";
import  {UserContext}  from "../../../Context/UserContext";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  // Using the useHistory hook for pushing a new route into the history
  const history = useHistory();

  // pull out hooks methods from useForm
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState(null);

  // destructuring Authcontext, we can set new state
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const onSubmit = (user, e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user} = data;
      const{firstName, lastName, _id, email, project} = data.user;
      if (isAuthenticated) {
        userContext.setUserId(_id);
        userContext.setUserFName(firstName);
        userContext.setUserLName(lastName);
        userContext.setUserProjects(project);
        userContext.setUserEmail(email);
        // ---
        authContext.setUserInfo(data);
        authContext.setIsAuthenticated(isAuthenticated);
        // If authenticated, use useHistory hook from react-router-dom to redirect to /projects route
        history.push("/");
      } else {
        // this will be an error message telling whats wrong
        setMessage({
          msgBody: "Invalid login credentials",
          msgErr: true,
        });
      }
      ProjectService.getRisksByUserId(_id)
      .then((res) =>{ 
          // userRisks, setUserRisks
          console.log(res);
          console.log(res.data.userRisks.length);
          userContext.setUserRisks(res.data.userRisks.length);
          const risks = res.data.userRisks;
          let numOfComments = 0;
          for (let i = 0; i < risks.length; i++) {
           numOfComments =+ risks[i].comments.length;
            
          }
          userContext.setUserComments(numOfComments);
      });
      ProjectService.getProjectByUserId(_id)
      .then((res) => {
        userContext.setUserProjects(res.data.usersProjects)
        userContext.setProjects(res.data.usersProjects.length);

      })

    });
    
  };
  
  return (
    <div>
      {message ? <Toast message={message} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            name="username"
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
