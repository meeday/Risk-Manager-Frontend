import React, { useState, useContext } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/NewRisk.css";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function NewRisk(props) {
  // Using the useHistory hook for pushing a new route into the history
  const history = useHistory();

  // Declare hooks from useForm
  const { register, handleSubmit, newRisk } = useForm();
  const [message, setMessage] = useState(null);

  // Event to handle user adding a new risk
  const onSubmit = (user, event) => {
    event.preventDefault();

    // Placeholder for submitting a new risk using an axios call to the backend application
  };

  return (
    <div>
      <h1>New risk</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group row">
          <div className="form-group col">
            <label>Risk Title</label>
            <input
              required
              name="riskTitle"
              type="text"
              className="form-control"
              placeholder="Risk Title"
              ref={newRisk}
            />
          </div>

          <div className="form-group col">
            <label>Risk ID</label>
            <input
              required
              name="riskId"
              type="text"
              className="form-control"
              placeholder="Risk ID"
              ref={newRisk}
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
            ref={newRisk}
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
            ref={newRisk}
          />
        </div>

        <div className="form-group row">
          <div className="form-group col">
            <label>Date Raised</label>
            <input
              required
              name="dateRaised"
              type="text"
              className="form-control"
              placeholder="Date Raised"
              ref={newRisk}
            />
          </div>

          <div className="form-group col">
            <label>Discipline</label>
            <input
              required
              name="endDate"
              type="text"
              className="form-control"
              placeholder="End date"
              ref={newRisk}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col">
            <label>Risk Likelihood</label>
            <input
              required
              name="riskLikelihood"
              type="text"
              className="form-control"
              placeholder="Risk Likelihood - select from scale"
              ref={newRisk}
            />
          </div>

          <div className="form-group col">
            <label>Risk Severity</label>
            <input
              required
              name="riskSeverity"
              type="text"
              className="form-control"
              placeholder="Risk Severity - select from scale"
              ref={newRisk}
            />
          </div>
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

export default NewRisk;
