import React, { useState, useContext } from "react";
import AuthService from '../../Services/AuthService';
import Message from '../Message/Message';
import {AuthContext} from '../../Context/AuthContext';
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onSubmit = (user, e) => {
    e.preventDefault();
    AuthService.login(user).then(data => {
        const {isAuthenticated, user, message} = data;
        if(isAuthenticated){
          // <AuthContext.Provider value={ data } />;
          // authContext.setIsAuthenticated(isAuthenticated);
          //   this history object from react-router
          // if authenticated navigate to Home  
          props.history.push('/home')
        }
        else{
          // this will be an error message telling whats wrong
          setMessage(message);
        }
    });
  };

  return (
    
    <div>
      {message ? <Message message={message}/> : null}
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
