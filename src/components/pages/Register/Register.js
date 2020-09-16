// Import npm modules, components and methods
import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../../Services/AuthService";
import { useForm } from "react-hook-form";
import Toast from "../../Toasts/Toast";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PrivacyPolicy from "../../PrivacyPolicy/PrivacyPolicy";

// Import CSS
import "./styles/Register.css";

// creating the Register component
export default function Register() {
  // Set states. Message holds any message returned from the server. Modal state is for modal visibility
  const [message, setMessage] = useState(null);
  const [modalState, setModalState] = useState("show" | "hide");

  // Using the useHistory hook for pushing a new route into the history
  const history = useHistory();

  //  pull out the in-built methods, what we going to use from UserForm hook
  const { register, handleSubmit } = useForm();

  // Function to toggle the modalState between "show" and "hide"
  const toggleModal = () => modalState === "show" ? setModalState("hide") : setModalState("show");

  // setting up a timer
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  // when user click the Sign Up button pass all the data to the server using
  // registor method as on AuthService.js
  const onSubmit = (user, e) => {
    AuthService.register(user).then((data) => {
      // pull out the message from the data what we get from the server
      const { message } = data;
      console.log(message);
      // pass server message to the message new state
      setMessage(message);
      // after we recivered server data we can clear the user infromation from Sign Up page
      e.target.reset();
      // if there is no message error, after 3sec redirect user to the login page
      if (!message.msgErr) {
        timerID = setTimeout(() => {
          // Use useHistory hook from react-router-dom to redirect to /login route
          history.push("/login");
        }, 3000);
      }
    });
  };

  return (
    <>
      {/* if there is a message go to the message component */}
      {message ? <Toast message={message} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign Up</h3>
        <div className="form-group row">
          <div className="col">
            <label>First name</label>
            <input
              required
              name="firstName"
              type="text"
              className="form-control"
              placeholder="First name"
              ref={register}
            />
          </div>
          <div className="col">
            <label>Last name</label>
            <input
              required
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              ref={register}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            required
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            required
            minLength={6}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            ref={register}
          />
        </div>
        <div className="form-group row">
          <div className="col">
            <label>Company</label>
            <input
              required
              type="text"
              name="company"
              className="form-control"
              placeholder="Enter Company"
              ref={register}
            />
          </div>
          <div className="col">
            <label>Job Title</label>
            <input
              required
              type="text"
              name="jobTitle"
              className="form-control"
              placeholder="Enter Job Title"
              ref={register}
            />
          </div>
        </div>
        <div className="text-center privacy">
          <p>By signing up you agree to our <a onClick={toggleModal}>privacy policy</a></p>
        </div>
        <Modal show={modalState === "show"}>
          <Modal.Header onClick={toggleModal} closeButton style={{background: "#007bff", color: "#FFFFFF"}}>Privacy policy</Modal.Header>
          <PrivacyPolicy />
        </Modal>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <div>
          <br />
          <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item">
              <span>Already have an account?</span>
              <Link className="nav-link" to={"/login"}>
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </form>
    </>
  );
}
