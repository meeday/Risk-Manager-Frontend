// Import npm modules, components and files
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ProjectService from "../../../Services/ProjectService";
import { config } from "../../../config";
import { ProjectContext } from "../../../Context/ProjectContext";
import SeverityHelpIcon from "../../helpIcons/SeverityHelpIcon";
import StatusHelpIcon from "../../helpIcons/StatusHelpIcon";
import LikelihoodHelpIcon from "../../helpIcons/LikelihoodHelpIcon";
import RiskScoreHelpIcon from "../../helpIcons/RiskScoreHelpIcon";

// Import CSS
import "./styles/NewRisk.css";

// Lookup object for risk scoring categorisation
const colorClasses = {
  1: "very-low",
  2: "low",
  3: "medium",
  4: "high",
  5: "very-high",
};

const statusIndex = {
  open: 1,
  transferred: 2,
  closed: 3,
};

// Google map API styling and options
const mapContainerStyle = {
  minWidth: "200px",
  maxWidth: "90vw",
  minHeight: "250px",
  maxheight: "80vh",
  margin: "0 auto",
};



// ******* mapCentre will need to be retrieved

// Disable all Google Maps UI features. Activate zoom control
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

function NewRisk(props) {
const token = localStorage.getItem("x-auth-token")
const projectContext = useContext(ProjectContext)
console.log(projectContext.projectInfo);

  // Use the useHistory hook for pushing a new route into the history
  const history = useHistory();
  
  // Declare hooks from useForm
  const { register, handleSubmit } = useForm();
  
  // Declare states
  // const [message, setMessage] = useState(null);
  const [likelihood, setLikelihood] = useState(1);
  const [severity, setSeverity] = useState(1);
  const [riskScore, setRiskScore] = useState(2);
  const [riskLocation, setRiskLocation] = useState({
    lat: 52.475,
    lng: -1.9,
  });
  
  // get the project id from URL
  const strPath = window.location.pathname;
  const path = strPath.replace("/project/", "");
  const id = path.replace("/new-risk", "");
  const projectId = id;

  const getLocation = async () => {
    try {
      const { data } = await ProjectService.getProject(id, token);
      setRiskLocation(data.project.location);      
    } catch (error) {
      console.log(`Error - newRisk.js - getProject() - ${error}`);      
    }
  };
  useEffect(() => {
    getLocation({});
  }, []);

  // Event to handle user adding a new risk
  const onSubmit = async (data, event) => {
    event.preventDefault();
    // Store properties of the data object which was created from the useForm
    const {
      title,
      description,
      status,
      riskId,
      designDiscipline,
      locationLat,
      locationLng,
    } = data;

    // Create a newRisk object using the submitted form data
    const newRisk = {
      title,
      riskId,
      description,
      designDiscipline,
      status: statusIndex[status],
      location: {
        lat: parseFloat(locationLat),
        lng: parseFloat(locationLng),
      },
      likelihood: parseInt(likelihood),
      severity: parseInt(severity),
      risk: riskScore,
      projectId,
    };

    try {
      // Submitting a post request to add the new risk to the backend application
      const res = await ProjectService.createRisk(newRisk, token);

      // ******* Add toast message to confirm risk has been added
      console.log(res);

      // Redirect user back to the project page
      history.push(`/project/${projectId}`);
    } catch (error) {
      console.error(`Error: NewRisk.js - onSubmit() - ${error}`);
    }
  };

  // Define events which change state
  const handleLikelihoodChange = (event) => {
    const selectedLikelihood = parseInt(event.target.value);
    setLikelihood(selectedLikelihood);
    setRiskScore(selectedLikelihood + severity);
  };

  const handleSeverityChange = (event) => {
    const selectedSeverity = parseInt(event.target.value);
    setSeverity(selectedSeverity);
    setRiskScore(selectedSeverity + likelihood);
  };

  const handleLocationChange = (event) => {
    // Take the lat and long from Google Maps click event, rounded to 6.d.p
    setRiskLocation({
      lat: Math.floor(event.latLng.lat() * 1000000) / 1000000,
      lng: Math.floor(event.latLng.lng() * 1000000) / 1000000,
    });
  };

  const setColorClass = (value) => {
    return `form-control ${colorClasses[value]}`;
  };

  const showResultingRisk = (value) => {
    if (value <= 4) {
      return `${riskScore} - Negligible risk`;
    }
    if (value <= 6) {
      return `${riskScore} - Tolerable risk`;
    }
    return `${riskScore} - Intolerable risk`;
  };

  const riskColorClass = (value) => {
    if (value <= 4) {
      return "form-control disabled-colored-risk very-low";
    }
    if (value <= 6) {
      return "form-control disabled-colored-risk medium";
    }
    return "form-control disabled-colored-risk very-high";
  };

  // Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
  });

  // Return errors or loading message if Google Maps does not load or is loading
  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return "Loading Google Maps";

  return (
    <div className="new-risk-wrapper">
      <div className="new-risk-inner">
        <h1>New risk</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row">
            <div className="form-group col-sm-9 col-xs-12">
              <label>Title</label>
              <input
                required
                name="title"
                type="text"
                className="form-control"
                placeholder="Risk Title"
                ref={register}
              />
            </div>

            <div className="form-group col-sm-3 col-xs-12">
              <label>
                Status
                <StatusHelpIcon/>
              </label>
              <select
                required
                name="status"
                className="form-control"
                ref={register}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="transferred">Transferred</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group col-sm-6 col-xs-12">
              <label>ID</label>
              <input
                required
                name="riskId"
                type="text"
                className="form-control"
                placeholder="Risk ID (must be unique)"
                ref={register}
              />
            </div>

            <div className="form-group col-sm-6 col-xs-12">
              <label>Discipline</label>
              <input
                required
                name="designDiscipline"
                type="text"
                className="form-control"
                placeholder="Design discipline"
                ref={register}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              name="description"
              type="text"
              className="form-control form-description"
              placeholder="Description"
              ref={register}
            />
          </div>

          <div>
            <br></br>
            <h6>Select risk location:</h6>
            <a
              href
              className="btn btn-primary show-map text-white"
              data-toggle="collapse"
              data-target="#collapseMap"
              aria-expanded="false"
              aria-controls="collapseMap"
            >
              Show map
            </a>

            <div className="collapse" id="collapseMap">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={riskLocation}
                options={mapOptions}
                onClick={handleLocationChange}
              >
                <Marker
                  position={{ lat: riskLocation.lat, lng: riskLocation.lng }}
                />
              </GoogleMap>
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group col-6">
              <label>Latitude</label>
              <input
                name="locationLat"
                className="form-control disabled-form"
                ref={register}
                value={riskLocation.lat}
                readOnly
              ></input>
            </div>
            <div className="form-group col-6">
              <label>Longitude</label>
              <input
                name="locationLng"
                className="form-control disabled-form"
                ref={register}
                value={riskLocation.lng}
                readOnly
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group col-sm-6 col-xs-12">
              <label>
                Likelihood
                <LikelihoodHelpIcon/>
              </label>
              <select
                required
                name="likelihood"
                className={setColorClass(likelihood)}
                ref={register}
                onChange={handleLikelihoodChange}
              >
                <option value="1">1 - Very low</option>
                <option value="2">2 - Low</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High</option>
                <option value="5">5 - Very high</option>
              </select>
            </div>

            <div className="form-group col-sm-6 col-xs-12">
              <label>
                Severity
                <SeverityHelpIcon/>
              </label>
              <select
                required
                name="severity"
                className={setColorClass(severity)}
                ref={register}
                onChange={handleSeverityChange}
              >
                <option value="1">1 - Very low</option>
                <option value="2">2 - Low</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - High</option>
                <option value="5">5 - Very high</option>
              </select>
            </div>

            <div className="form-group form-center col-sm-6 col-xs-12">
              <label>
                Risk score
                <RiskScoreHelpIcon/>
              </label>
              <div className={riskColorClass(riskScore)}>
                <p>{showResultingRisk(riskScore)}</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block submit-btn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewRisk;
