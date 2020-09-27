// Import npm modules, components and methods
import dotenv from "dotenv";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Navbar from "../../Nav/Nav";
import LoadScriptOnlyIfNeeded from "../../LoadScriptOnlyIfNeeded/LoadScriptOnlyIfNeeded";
import Warning from "../Warning/Warning";
import ProjectService from "../../../Services/ProjectService";
import { Modal } from "react-bootstrap";
import { ProjectContext } from "../../../Context/ProjectContext";
import { UserContext } from "../../../Context/UserContext";

// Import CSS
import "./styles/Project.css";

// Configure dotenv for environment variables
dotenv.config();

const Projects = () => {

  const history = useHistory();

  const { projectInfo, setProjectInfo } = useContext(ProjectContext);
  
  const token = localStorage.getItem("x-auth-token");

  const [projectData, setProjectData] = useState([]);
  const [projectRisks, setProjectRisks] = useState([]);
  const [selected, setSelected] = useState();
  const [modalState, setModalState] = useState("show" | "hide");

  const strPath = window.location.pathname;
  const id = strPath.replace("/project/", "");

  const getProject = async (id, userToken) => {
    try {
      const data = await ProjectService.getProject(id, userToken);
      const projectData = data.data.project;
      setProjectInfo(projectData);
      setProjectData(projectData);
    } catch (err) {
      console.log(`Error - Project.js - getProject.js - ${err}`);
    }
  };

  const projectId = id;

  // Function to toggle the modalState between "show" and "hide"
  const toggleModal = () =>
    modalState === "show" ? setModalState("hide") : setModalState("show");

  // Set options for Google Map
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  // Function which returns URL for a Google map marker of the color appropriate to the risk score
  const markerColor = (riskScore) => {
    // Green marker (negligible risk)
    if (riskScore <= 4) {
      return "http://maps.google.com/mapfiles/ms/micons/green.png";
    }
    // Orange marker (tolerable risk)
    if (riskScore <= 6) {
      return "http://maps.google.com/mapfiles/ms/micons/orange.png";
    }
    // Red marker (intolerable risk)
    return "http://maps.google.com/mapfiles/ms/micons/red.png";
  };

  // API call to get all all risks of the current project
  const getProjectRisks = async (projectId, userToken) => {
    try {
      const dataReturn = await ProjectService.getRisksByProjectId(
        projectId,
        userToken
      );
      const arrayData = dataReturn.data.projectRisks;
      setProjectRisks(arrayData);
    } catch (err) {
      console.log(`Error - Project.js - getProjectRisks() - ${err}`);
    }
  };

  const deleteProject = async () => {
    try {
      const deletedProject = await ProjectService.deleteProject(id, token);
      history.push("/home");
      
    } catch (err) {
      console.log(`Error - Project.js - deleteProject() - ${err}`);
    }
  };
  // Call the function which gets all users and sets to state
  useEffect(() => {
    getProjectRisks(projectId, token);
    getProject(id, token);
  }, []);

  const mapCenter = projectData.location;

  return (
    <>
      {projectInfo ? (
        <>
          <Navbar />
          <div className="map">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="project-details">
                  <h1>{projectInfo ? projectInfo.title : null}</h1>
                  <div className="data-block">
                    <p>{projectInfo ? projectInfo.description : null}</p>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="data-block">
                        <i className="icon fa fa-map-marker"></i>
                        <h2>Latitude</h2>
                        <span className="project-content">{`${
                          projectInfo ? projectInfo.location.lat : null
                        }`}</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="data-block">
                        <h2>Longitude</h2>
                        <span className="project-content">{`${
                          projectInfo ? projectInfo.location.lng : null
                        }`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="data-block">
                    <i className="icon fas fa-user-tie"></i>
                    <h2>Client</h2>
                    <span className="project-content">
                      {projectInfo ? projectInfo.client : null}
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="data-block">
                        <i className="icon far fa-clock"></i>
                        <h2>Start Date</h2>
                        <span className="project-content">
                          {projectInfo
                            ? projectInfo.startDate.slice(0, 10)
                            : null}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="data-block">
                        <h2>End Date</h2>
                        <span className="project-content">
                          {projectInfo
                            ? projectInfo.endDate.slice(0, 10)
                            : null}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="data-block">
                    <i className="icon fas fa-users"></i>
                    <h2>Team Members</h2>
                    <div className="project-content">
                      {projectInfo
                        ? projectInfo.teamMembers.map((user) => (
                            <li className="users">{user[0].name}</li>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="map-container">
                  <h1>Risks map</h1>
                  <p className="info-text">Click on a risk to view</p>
                  <LoadScriptOnlyIfNeeded
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                  >
                    <GoogleMap
                      options={mapOptions}
                      center={mapCenter}
                      zoom={12}
                      id="map"
                    >
                      {projectRisks
                        ? projectRisks.map((risk) => (
                            <Marker
                              key={risk._id}
                              position={risk.location}
                              icon={markerColor(risk.risk)}
                              title={risk.title}
                              onClick={() => {
                                setSelected(risk);
                              }}
                            />
                          ))
                        : null}

                      {selected ? (
                        <InfoWindow
                          position={{
                            lat: selected.location.lat,
                            lng: selected.location.lng,
                          }}
                          onCloseClick={() => {
                            setSelected(null);
                          }}
                        >
                          <div className="map-popup">
                            <h2>{selected.title}</h2>
                            <p>Likelihood: {selected.likelihood}</p>
                            <p>Severity: {selected.severity}</p>
                            <p>Risk score: {selected.risk}</p>
                            <a
                              href={`/project/${selected.projectId}/risk/${selected._id}`}
                            >
                              Go to risk
                            </a>
                          </div>
                        </InfoWindow>
                      ) : null}
                    </GoogleMap>
                  </LoadScriptOnlyIfNeeded>
                  <div className="row">
                    <div className="col-4 key">
                      <img className="key-icon" src={markerColor(1)}></img>
                      <span className="key-definition">negligible</span>
                    </div>
                    <div className="col-4 key">
                      <img className="key-icon" src={markerColor(6)}></img>
                      <span className="key-definition">tolerable</span>
                    </div>
                    <div className="col-4 key">
                      <img className="key-icon" src={markerColor(10)}></img>
                      <span className="key-definition">intolerable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-danger add btn-center"
                  onClick={toggleModal}
                >
                  <a>Delete Project</a>
                </button>
                <Modal show={modalState === "show"}>
                  <Modal.Header
                    onClick={toggleModal}
                    closeButton
                    style={{ background: "#dc3545", color: "#FFFFFF" }}
                  >
                    Warning
                  </Modal.Header>
                  <Warning
                    deletingComponent="project"
                    confirmDelete={deleteProject}
                    deleteArg={projectId}
                  />
                </Modal>
              </div>
              <div className="col-6">
                <button className="btn btn-primary add btn-center">
                  <a href={`/project/${projectId}/new-risk`}>Add Risk</a>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Projects;
