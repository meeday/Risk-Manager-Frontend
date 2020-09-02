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

  // Return errors or loading message if Google Maps does not load or is loading
  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return "Loading Google Maps";


  return (
    <div>
      <h1>New risk</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group row">
          <div className="form-group col-9">
            <label>Title</label>
            <input
              required
              name="riskTitle"
              type="text"
              className="form-control"
              placeholder="Risk Title"
              ref={newRisk}
            />
          </div>

          <div className="form-group col-3">
            <label>
              Status 
              <span 
                className="label-popover"
                data-toggle="popover"
                data-trigger="hover" 
                data-placement="top"
                data-html="true" 
                title="Status"
                data-content="<strong>Open:</strong> The risk is present in the design.
                <br />
                <strong>Closed:</strong> The risk has been mitigated, so it is no longer present in the design.
                <br />
                <strong>Transferred:</strong> Ownership of the risk has been transferred to another party.">
                <FontAwesomeIcon icon={faQuestionCircle}/>
              </span>
            </label>
            <select required name="riskStatus" className="form-control" ref={newRisk}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="transferred">Transferred</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col">
            <label>ID</label>
            <input
              required
              name="riskId"
              type="text"
              className="form-control"
              placeholder="Risk ID (must be unique)"
              ref={newRisk}
            />
          </div>

          <div className="form-group col">
            <label>Discipline</label>
            <input
              required
              name="discipline"
              type="text"
              className="form-control"
              placeholder="Design discipline"
              ref={newRisk}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            required
            name="description"
            type="text"
            className="form-control"
            placeholder="Description"
            ref={newRisk}
            style={{minHeight: "85px", paddingTop: "5px"}}
            />
        </div>

        <div>
          <br></br>
          <h6>Select risk location:</h6>
          <button 
            className="btn btn-primary"
            data-toggle="collapse"
            data-target="#collapseMap"
            aria-expanded="false"
            aria-controls="collapseMap"
            style={{marginBottom: "8px"}}
          >
            Show map
          </button>

          <div class="collapse" id="collapseMap">
            <GoogleMap 
              mapContainerStyle={mapContainerStyle} 
              zoom={12} 
              center={mapCentre}
              options={mapOptions}
              onClick={handleLocationChange}
            >
              <Marker position={{lat: riskLocation.lat, lng: riskLocation.lng}}/>
            </GoogleMap>
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col">
            <label>Latitude</label>
            <div className="form-control" style={{background: "#999"}}>
              <p style={{margin: "7.5px 0"}}>
                {riskLocation.lat}
              </p>
            </div>
          </div>
          <div className="form-group col">
            <label>Longitude</label>
            <div className="form-control" style={{background: "#999"}}>
              <p style={{margin: "7.5px 0"}}>
                {riskLocation.lng}
              </p>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col">

            <label>
              Risk Likelihood 
              <span 
                className="label-popover"
                data-toggle="popover"
                data-trigger="hover" 
                data-placement="top"
                data-html="true" 
                title="Likelihood scoring"
                data-content="<strong class='very-low'> 1 - Very low:</strong> The event is unlikely to occur but may by exception occur.
                <br />
                <strong class='low'> 2 - Low:</strong> The event can be expected to occur during the lifecycle.
                <br />
                <strong class='medium'> 3 - Medium:</strong> The event is likely to occur several times.
                <br />
                <strong class='high'> 4 - High:</strong> The event will occur several times and is likely to occur often.
                <br />
                <strong class='very-high'> 5 - Very high:</strong> The event is likely to occur on a daily basis.">
                <FontAwesomeIcon icon={faQuestionCircle}/>
              </span>
            </label>
            <select required name="riskLikelihood" className={setColorClass(likelihood)} ref={newRisk} onChange={handleLikelihoodChange}>
              <option value="1">1 - Very low</option>
              <option value="2">2 - Low</option>
              <option value="3">3 - Medium</option>
              <option value="4">4 - High</option>
              <option value="5">5 - Very high</option>
            </select>
          </div>

          <div className="form-group col">
            <label>
              Risk Severity
              <span
                className="label-popover"
                data-toggle="popover"
                data-trigger="hover" 
                data-placement="top"
                data-html="true" 
                title="Severity scoring"
                data-content="<strong class='very-low'> 1 - Very low:</strong> Non-reportable injury.
                <br />
                <strong class='low'> 2 - Low:</strong> Minor injury.
                <br />
                <strong class='medium'> 3 - Medium:</strong> Major injury or multiple minor injuries.
                <br />
                <strong class='high'> 4 - High:</strong> Single fatality or multiple major injuries.
                <br />
                <strong class='very-high'> 5 - Very high:</strong> Multiple fatalities.">
                <FontAwesomeIcon icon={faQuestionCircle}/>
              </span>
            </label>
            <select required name="riskSeverity" className={setColorClass(severity)} ref={newRisk} onChange={handleSeverityChange}>
              <option value="1">1 - Very low</option>
              <option value="2">2 - Low</option>
              <option value="3">3 - Medium</option>
              <option value="4">4 - High</option>
              <option value="5">5 - Very high</option>
            </select>
          </div>
          <div className="form-group col">
            <label>
              Resulting risk score
              <span
                className="label-popover"
                data-toggle="popover"
                data-trigger="hover" 
                data-placement="top"
                data-html="true" 
                title="Risk score"
                data-content="Overall risk score is calculated as the sum of the likelihood and severity scores.
                <br />
                <strong class='very-low'> 2-4 = Negligible low risk:</strong> Ensure control measures are maintained and reviewed as necessary to control residual risk as far as is reasonably practicable.
                <br />
                <strong class='medium'> 5-6 = Tolerable risk:</strong> Control measures to reduce risk rating to a level which is as low as reasonably practicable (ALARP). Add details of residual risk to drawings/docs.
                <br />
                <strong class='very-high'> 7-10 = Intolerale risk:</strong> Activity not permitted. Hazard to be avoided or reduced.">
                <FontAwesomeIcon icon={faQuestionCircle}/>
              </span>
            </label>
            <div className={riskColorClass(riskScore)} style={{opacity: "0.7"}}>
              <p style={{margin: "7.5px 0"}}>
                {showResultingRisk(riskScore)}
              </p>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        
      </form>
    </div>
  );
}

export default NewRisk;
