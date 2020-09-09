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
dotenv.config();

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const marker = { lat: 52.479738, lng: -1.903979 };

const ExistingRisk = () => {
  const history = useHistory();

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
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
    console.log(res);
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
    
    // ****** riskId should be retrieved from risk context
    const riskId = "5f58e059beafd371b8e337c0";

    try {
      const savedComment = await ProjectService.createComment(riskId, newComment);
      console.log(savedComment);

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
        <div className="map-c">
          <h1>Bridge Issue</h1>
          <div className="row">
            <div className="col-sm-6">
              <h3>
                ID:<span className="text-white">003</span>
              </h3>
            </div>
            <div className="col-sm-6">
              <h3>
                Status:<span className="text-white">Open</span>
              </h3>
            </div>
          </div>
          <p className="riskDetails">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium id cumque est dolores voluptatibus.
          </p>
          <div className="det">
            <p className="riskDetails">
              <i className="fa fa-map-marker icon marker-icon"></i>{" "}
              <h2>Location</h2>
              Westminster, London SW1A 0AA
            </p>
            <p className="riskDetails">
              <i className="fas fa-pencil-ruler icon design-icon"></i>
              <h2>Design Discipline</h2>
              Bridge
            </p>
            <p className="riskDetails">
              <i className="fas fa-exclamation-triangle icon risk-icon"></i>
              <h2>Risk Score</h2>
              <div className="risk">Intolerable 8</div>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="comments">
            <i className="fas fa-comments icon comments-icon"></i>
            <h2>Comments & Suggested Mitigations</h2>
            <textarea
              name="content"
              ref={register}
              id="newPost"
              placeholder="Add Comment"
            ></textarea>
            <button
              type="submit"
              className="btn btn-primary risk-btn"
            >
              Add Comment
            </button>
            <button
              onClick={handleShowModalOne}
              type="submit"
              className="btn btn-primary risk-btn"
            >
              View Comments
            </button>
            <Modal show={modalState === "modal-one"}>
              <Modal.Header onClick={handleClose} closeButton></Modal.Header>

              <Comments />
            </Modal>
          </form>
          <div>
            <button
              onClick={handleShowModalTwo}
              type="submit"
              className="btn btn-primary risk-btn"
            >
              Edit Risk
            </button>
            <Modal show={modalState === "modal-two"}>
              <Modal.Header onClick={handleClose} closeButton></Modal.Header>
              <EditRisk className="edit-form" />
            </Modal>
            <button
              onClick={handleDelete}
              type="submit"
              className="btn btn-danger risk-btn"
            >
              Delete Risk
            </button>
            {message ? <Toast message={message} /> : null}
          </div>
        </div>

        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap options={mapOptions} center={marker} zoom={18} id="map">
            <Marker position={marker}></Marker>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default ExistingRisk;
