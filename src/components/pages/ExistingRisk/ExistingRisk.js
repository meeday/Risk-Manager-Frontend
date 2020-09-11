import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import dotenv from "dotenv";
import Navbar from "../../Nav/Nav";
import Toast from "../../Toasts/Toast";
import Comments from "./subComponents/riskComments";
import EditRisk from "./subComponents/editRisk";
import ProjectService from "../../../Services/ProjectService";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./styles/ExistingRisk.css";
import LoadScriptOnlyIfNeeded from "../../LoadScriptOnlyIfNeeded/LoadScriptOnlyIfNeeded";
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

const showResultingRisk = (value) => {
  if (value <= 4) {
    return `${value} - Negligible risk`;
  }
  if (value <= 6) {
    return `${value} - Tolerable risk`;
  }
  return `${value} - Intolerable risk`;
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
  const [modalState, setModalState] = useState(
    "modal-one" | "modal-two" | "close"
  );

  const handleShowModalOne = () => {
    setModalState("modal-one");
  };

  const handleShowModalTwo = () => {
    setModalState("modal-two");
  };

  const handleClose = () => {
    setModalState("close");
  };

  const handleDelete = async () => {
    setMessage({ msgBody: "Risk Deleted!", msgErr: false });
    timerID = setTimeout(() => {
      history.push("/project");
    }, 1500);
    const res = await ProjectService.deleteRisk("003");
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

      // ****** Display a message alerting the user that their comment has been saved
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
            <h2>Risk Score</h2>
            <p>
              {showResultingRisk((risk || {}).risk || null)}
            </p>
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
              <button
                onClick={handleShowModalOne}
                type="submit"
                className="btn btn-primary risk-btn btn-center"
                >
                View Comments
              </button>
              <Modal show={modalState === "modal-one"}>
                <Modal.Header onClick={handleClose} closeButton></Modal.Header>

                <Comments />
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
              onClick={handleDelete}
              type="submit"
              className="btn btn-danger risk-btn btn-center"
              >
              Delete Risk
            </button>
            {message ? <Toast message={message} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExistingRisk;
