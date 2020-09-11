import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/ExistingRisk.css";
import ProjectService from "../../../../Services/ProjectService";
import { config } from "../../../../config";

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

// ******* projectID will need to be retrieved
const projectId = "5f5ba33493d9387958ea16b5";

// ******* mapCentre will need to be retrieved

// Disable all Google Maps UI features. Activate zoom control
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

function EditRisk(props) {
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

  const getLocation = async () => {
    const { data } = await ProjectService.getProject(
      "5f5ba33493d9387958ea16b5"
    );
    console.log(data)
    setRiskLocation(data.project.location);
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

    console.log(newRisk);

    try {
      // Submitting a post request to add the new risk to the backend application
      const res = await ProjectService.editRisk("5f5ba33493d9387958ea16b0", newRisk);

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
    <div className="edit-risk-wrapper">
      <div className="edit-risk-inner">
        <h1>Edit risk</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row">
            <div className="form-group col-sm-9 col-xs-12">
              <label>Title</label>
              <input
                required
                name="title"
                type="text"
                className="form-control"
                defaultValue={props.data.title}
                ref={register}
              />
            </div>

            <div className="form-group col-sm-3 col-xs-12">
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
                    <strong>Transferred:</strong> Ownership of the risk has been transferred to another party."
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
              </label>
              <select
                required
                name="status"
                defaultValue={props.data.status}
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
              <label>Discipline</label>
              <input
                required
                name="designDiscipline"
                type="text"
                defaultValue={props.data.designDiscipline}
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
              defaultValue={props.data.description}
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
                  position={riskLocation}
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
                defaultValue={props.data.location.lat}
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
                defaultValue={props.data.location.lng}
                value={riskLocation.lng}
                readOnly
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group col-sm-6 col-xs-12">
              <label>
                Likelihood
                <span
                  className="label-popover"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  data-html="true"
                  title="Likelihood scoring"
                  data-content="<span class='very-low'> 1 - Very low:</span> The event is unlikely to occur but may by exception occur.
                    <br />
                    <span class='low'> 2 - Low:</span> The event can be expected to occur during the lifecycle.
                    <br />
                    <span class='medium'> 3 - Medium:</span> The event is likely to occur several times.
                    <br />
                    <span class='high'> 4 - High:</span> The event will occur several times and is likely to occur often.
                    <br />
                    <span class='very-high'> 5 - Very high:</span> The event is likely to occur on a daily basis."
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
              </label>
              <select
                required
                name="likelihood"
                defaultValue={props.data.likelihood}
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
                <span
                  className="label-popover"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  data-html="true"
                  title="Severity scoring"
                  data-content="<span class='very-low'> 1 - Very low:</span> Non-reportable injury.
                    <br />
                    <span class='low'> 2 - Low:</span> Minor injury.
                    <br />
                    <span class='medium'> 3 - Medium:</span> Major injury or multiple minor injuries.
                    <br />
                    <span class='high'> 4 - High:</span> Single fatality or multiple major injuries.
                    <br />
                    <span class='very-high'> 5 - Very high:</span> Multiple fatalities."
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
              </label>
              <select
                required
                name="severity"
                defaultValue={props.data.severity}
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
                <span
                  className="label-popover"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  data-html="true"
                  title="Risk score"
                  data-content="Overall risk score is calculated as the sum of the likelihood and severity scores.
                    <br />
                    <span class='very-low'> 2-4 = Negligible risk:</span> Ensure control measures are maintained and reviewed as necessary to control residual risk as far as is reasonably practicable.
                    <br />
                    <span class='medium'> 5-6 = Tolerable risk:</span> Control measures to reduce risk rating to a level which is as low as reasonably practicable (ALARP). Add details of residual risk to drawings/docs.
                    <br />
                    <span class='very-high'> 7-10 = Intolerable risk:</span> Activity not permitted. Hazard to be avoided or reduced."
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
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
            Save Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRisk;
