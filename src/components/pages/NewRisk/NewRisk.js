import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete } from "@react-google-maps/api"
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/NewRisk.css";
import dotenv from "dotenv";
dotenv.config();

// Lookup object for risk scoring categorisation
const colorClasses = {
  1: "very-low",
  2: "low",
  3: "medium",
  4: "high",
  5: "very-high"
}

// Google map API styling and options
const mapContainerStyle = {
  width: "90vw",
  height: "80vh",
  margin: "0 auto",
}

// ******* Change to the centre of the project
const mapCentre = {
  lat: 52.476089,
  lng: -1.898557
}

const mapOptions = {
  disableDefaultUI: true,  
  zoomControl: true,
}

function NewRisk(props) {
  // Using the useHistory hook for pushing a new route into the history
  const history = useHistory();

  // Declare hooks from useForm
  const { register, handleSubmit, newRisk } = useForm();

  // Declare states
  const [message, setMessage] = useState(null);
  const [likelihood, setLikelihood] = useState(1);
  const [severity, setSeverity] = useState(1);
  const [riskScore, setRiskScore] = useState(2);
  const [riskLocation, setRiskLocation] = useState(mapCentre);


  // Event to handle user adding a new risk
  const onSubmit = (user, event) => {
    event.preventDefault();

    // Placeholder for submitting a new risk using an axios call to the backend application
  };

  
  // Define events which change state
  const handleLikelihoodChange = event => {
    const selectedLikelihood = parseInt(event.target.value);
    setLikelihood(selectedLikelihood);
    setRiskScore(selectedLikelihood + severity);
  };
  
  const handleSeverityChange = event => {
    const selectedSeverity = parseInt(event.target.value);
    setSeverity(selectedSeverity);
    setRiskScore(selectedSeverity + likelihood);
  };

  const handleLocationChange = event => {
    // Take the lat and long from Google Maps click event, rounded to 6.d.p
    setRiskLocation({
      lat: Math.floor(event.latLng.lat() * 1000000) / 1000000,
      lng: Math.floor(event.latLng.lng() * 1000000) / 1000000,
    });
  }

  const setColorClass = value => {
    return `form-control ${colorClasses[value]}`;
  };

  const showResultingRisk = value => {
    if (value <= 4) {
      return `${riskScore} - Negligible low risk`
    }
    if (value <= 6) {
      return `${riskScore} - Tolerable risk`
    }
    return `${riskScore} - Intolerable risk`
  };

  const riskColorClass = value => {
    if (value <= 4) {
      return "form-control very-low";
    }
    if (value <= 6) {
      return "form-control medium";
    }
    return "form-control very-high";
  };
  

  // Google Maps
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return "Loading Google Maps";

  
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
