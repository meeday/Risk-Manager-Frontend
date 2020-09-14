// Import npm modules, components and files
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import dotenv from "dotenv";
import Navbar from "../../Nav/Nav";
import Comments from "../../Comments/Comments";
import EditRisk from "./subComponents/editRisk";
import ProjectService from "../../../Services/ProjectService";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import LoadScriptOnlyIfNeeded from "../../LoadScriptOnlyIfNeeded/LoadScriptOnlyIfNeeded";
import SeverityHelpIcon from "../../helpIcons/SeverityHelpIcon";
import StatusHelpIcon from "../../helpIcons/StatusHelpIcon";
import LikelihoodHelpIcon from "../../helpIcons/LikelihoodHelpIcon";
import RiskScoreHelpIcon from "../../helpIcons/RiskScoreHelpIcon";
import Message from "../../Toasts/Toast";
import Warning from "../Warning/Warning";

// Import CSS
import "./styles/ExistingRisk.css";

// Configure dotenv
dotenv.config();

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const marker = { lat: 52.479738, lng: -1.903979 };

const statusIndex = {
  1: "open",
  2: "transferred",
  3: "closed",
};

const riskIndex = {
  1: "Very low",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Very high",
};

const riskLikeSevIndex = {
  1: "very-low",
  2: "low",
  3: "medium",
  4: "high",
  5: "very-high",
};

const riskClassIndex = riskScore => {
  if (riskScore <= 6) {
    return "very-low";
  }
  if (riskScore <= 8) {
    return "medium";
  }
  return "very-high";
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

const showResultingRisk = (value) => {
  if (value <= 6) {
    return `${value} - Negligible`;
  }
  if (value <= 8) {
    return `${value} - Tolerable`;
  }
  return `${value} - Intolerable`;
};

const ExistingRisk = () => {
  const history = useHistory();


  const [risk, setRisk] = useState();

  let timerID = useRef(null);

  const getRisk = async riskId => {
    try {
      const res = await ProjectService.getRisk(riskId);
      setRisk(res.data.risk)
      return () => {
        clearTimeout(timerID);
      };
    }
    catch (err) {
      console.log(`Error - ExistingRisk.js - useEffect() - ${err}`);
    }
  }
  
  useEffect(() => {
    const strPath = window.location.pathname;
    const id = strPath.slice(strPath.length - 24, strPath.length);
    getRisk(id);
  }, []);

  const [message, setMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);
  const [modalState, setModalState] = useState(
    "modal-one" | "modal-two" | "modal-three" | "close"
  );

  const handleShowModalOne = () => {
    setModalState("modal-one");
  };

  const handleShowModalTwo = () => {
    setModalState("modal-two");
  };

  const handleShowModalThree = () => {
    setModalState("modal-three");
  };

  const handleClose = () => {
    setModalState("close");
  };

  const handleDelete = async riskId => {
    try {
      // Make the API call to delete the risk
      const res = await ProjectService.deleteRisk(riskId);
  
      if (res.data) {
        setWarningMessage({ msgBody: "Risk deleted", msgErr: false });
        timerID = setTimeout(() => {
          history.push("/project");
        }, 3000);
      }
    }
    catch (err) {
      console.log(`Error - ExistingRisk.js - handleDelete() - ${err}`);
    }
  };
 

  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    const { content } = data;
    
    // ****** user data should be retrieved from project context
    const user = {
      name: "Joe Dodgson",
      userId: "5f52457cc802405d08f096c7",
    };

    const newComment = {
      content,
      user,
      date: Date.now(),
    }
    
    try {
      const savedComment = await ProjectService.createComment(risk._id, newComment);

      // Display a message alerting the user that their comment has been saved
      setMessage({ msgBody: "Comment added", msgErr: false });

      const strPath = window.location.pathname;
      const id = strPath.slice(strPath.length - 24, strPath.length);
      getRisk(id);
    }
    catch (err) {
      console.log(`Error - ExistingRisk.js - onSubmit() - ${err}`);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="map">
        <h1>{(risk || {}).title || null}</h1>
        <div className="riskDetails">
          <p>
            {(risk || {}).description || null}
          </p>
        </div>
        <div className="row riskDetails">
          <div className="col-sm-6">
            <h2>
              Risk ID:<span className="text-white"> {(risk || {}).riskId || null}</span>
            </h2>
          </div>
          <div className="col-sm-6">
            <h2>
              Risk status:<span className="text-white"> {statusIndex[(risk || {}).status || null]}</span>
              <span>
                <StatusHelpIcon/>
              </span>
            </h2>
          </div>
        </div>
        <div className="det">
          <div className="riskDetails">
            <i className="fa fa-map-marker icon marker-icon"></i>{" "}
            <h2>Location</h2>
            <div className="row">
              <div className="col-sm-6">
                <h3>
                  Latitude:<span className="text-white"> {((risk || {}).location || {}).lat || null}</span>
                </h3>
              </div>
              <div className="col-sm-6">
                <h3>
                  Longitude:<span className="text-white"> {((risk || {}).location || {}).lng || null}</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="riskDetails">
            <i className="fas fa-pencil-ruler icon design-icon"></i>
            <h2>Design Discipline</h2>
            <p>
              {(risk || {}).designDiscipline || null}
            </p>
          </div>
          <div className="riskDetails">
            <i className="fas fa-exclamation-triangle icon risk-icon"></i>
            <h2>Risk Ranking</h2>
            <div className="row">
              <div className="col-sm-6">
                <h3>Likelihood: 
                  <span className={`text-white ${riskLikeSevIndex[(risk || {}).likelihood || null]}`}>{(risk || {}).likelihood || null} - {riskIndex[(risk || {}).likelihood || null]}</span>  
                  <span className="text-white">
                    <LikelihoodHelpIcon/>
                  </span>
                </h3>
              </div>
              <div className="col-sm-6">
                <h3>
                  Severity: 
                  <span className={`text-white ${riskLikeSevIndex[(risk || {}).severity || null]}`}>{(risk || {}).severity || null} - {riskIndex[(risk || {}).severity || null]}</span>  
                  <span className="text-white">
                    <SeverityHelpIcon/>
                  </span>
                </h3>
              </div>
            </div>
            <h3>Risk score: 
              <span className={`text-white ${riskClassIndex((risk || {}).risk || null)}`}>{showResultingRisk((risk || {}).risk || null)}</span>  
              <span className="text-white">
                <RiskScoreHelpIcon/>
              </span>
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="comments">
          <i className="fas fa-comments icon comments-icon"></i>
          <h2>Comments</h2>
          <textarea
            name="content"
            ref={register}
            id="newPost"
            placeholder="Add Comment"
          ></textarea>
          {message ? <Message message={message} /> : null}
          <div className="row">
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-primary risk-btn btn-center"
              >
                Add Comment
              </button>
            </div>
            <div className="col-6">
              <div
                onClick={handleShowModalOne}
                className="btn btn-primary risk-btn btn-center"
                style={{width: "fit-content"}}
                >
                View Comments
              </div>
              <Modal show={modalState === "modal-one"}>
                <Modal.Header onClick={handleClose} closeButton style={{color: "#FFFFFF"}}>Comments</Modal.Header>
                <Comments risks={[risk]}/>
              </Modal>
            </div>
          </div>
        </form>      

        <LoadScriptOnlyIfNeeded
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap options={mapOptions} center={(risk || {}).location || null} zoom={18} id="map">
            <Marker position={(risk || {}).location || null}></Marker>
          </GoogleMap>
        </LoadScriptOnlyIfNeeded>
        <div className="row">
          <div className="col-6">
            <button
              onClick={handleShowModalTwo}
              type="submit"
              className="btn btn-primary risk-btn btn-center"
              >
              Edit Risk
            </button>
            <Modal show={modalState === "modal-two"}>
              <Modal.Header onClick={handleClose} closeButton></Modal.Header>
              <EditRisk className="edit-form" />
            </Modal>
          </div>
          <div className="col-6">
            <button
              onClick={handleShowModalThree}
              className="btn btn-danger risk-btn btn-center"
              >
              <a>Delete Risk</a>
            </button>
            <Modal show={modalState === "modal-three"}>
              <Modal.Header
                onClick={handleClose}
                closeButton
                style={{ background: "#dc3545", color: "#FFFFFF" }}
              >
                Warning
              </Modal.Header>
              <Warning
                deletingComponent="risk"
                confirmDelete={handleDelete}
                deleteArg={(risk || {})._id || null}
                warningMessage={warningMessage}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExistingRisk;
