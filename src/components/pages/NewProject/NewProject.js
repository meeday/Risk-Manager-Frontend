import React, { useState, useContext } from "react";
import CreateService from "../../../Services/CreateService";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/NewProject.css";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function NewProject(props) {
  // Using the useHistory hook for pushing a new route into the history
  const history = useHistory();

  // Declare hooks from useForm
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState(null);

  // Event to handle user adding a new project
  const onSubmit = (user, event) => {
    event.preventDefault();
    console.log(user);
    CreateService.CreateProject(user)
      .then(res => {
        if (res.data.status === "error") {
            throw new Error(res.data.message);
        }
      })
      .catch(err => {
          return err;
      })
    event.target.reset();
    // Placeholder for submitting a new project using an axios call to the backend application
  };

  return (
    <div>
      <h1>New project</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        <h3>Project Details</h3>

        <div className="form-group row">
          <div className="form-group col">
            <label>Project Name</label>
            <input
              required
              name="projectName"
              type="text"
              className="form-control"
              placeholder="Project Name"
              ref={register}
              required
            />
          </div>

          <div className="form-group col">
            <label>Client</label>
            <input
              required
              name="client"
              type="text"
              className="form-control"
              placeholder="Client"
              ref={register}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            required
            name="description"
            type="text"
            className="form-control"
            placeholder="Description"
            ref={register}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            required
            name="location"
            type="text"
            className="form-control"
            placeholder="Location (select on map)"
            ref={register}
          />
        </div>

        <div className="form-group row">
          <div className="form-group col">
            <label>Start date</label>
            <input
              required
              name="startDate"
              type="text"
              className="form-control"
              placeholder="Start date"
              ref={register}
            />
          </div>

          <div className="form-group col">
            <label>End date</label>
            <input
              required
              name="endDate"
              type="text"
              className="form-control"
              placeholder="End date"
              ref={register}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Team members</label>
          <input
            required
            name="Team members"
            type="text"
            className="form-control"
            placeholder="Team members - select from a list"
            ref={register}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        
      </form>
      
      <div>
        <p>Map placeholder</p>
      </div>
    </div>
  );
}

export default NewProject;
