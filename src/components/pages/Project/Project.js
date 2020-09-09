import React, { Component, useState, useContext, useEffect } from "react";
import { ProjectContext } from "../../../Context/ProjectContext";
import ProjectService from "../../../Services/ProjectService";
import dotenv from "dotenv";
import Navbar from "../../Nav/Nav";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./styles/Project.css";
import { ModalTitle } from "react-bootstrap";
dotenv.config();

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const markers = [
  { lat: 52.479738, lng: -1.903979 },
  { lat: 52.474876, lng: -1.904408 },
  { lat: 52.474744, lng: -1.888884 },
];

const teamMembers = ["Joe", "Niro", "Ian", "Meedaxa"];
const mapCenter = {
  lat: 52.479161,
  lng: -1.895446,
};

const Projects = () => {
  const projectContext = useContext(ProjectContext);
  // const [project, setProject] = useState([]);
  const strPath = window.location.pathname;
  const id = strPath.replace("/project/", "");

  const getProject = async (id) => {
    try {
      const data = await ProjectService.getProject(id);
      const projectData = data.data.project;
      projectContext.setProjectInfo(projectData);
      // setProject(projectData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProject(id);
  }, []);
  
  // const {title, description, _id, client, endDate, startDate, teamMembers, location } = project;
  // projectContext.setProjectInfo(project);
  if(projectContext.projectInfo){
    const {title, description, _id, client, endDate, startDate, teamMembers, location } = projectContext.projectInfo;
    
  }
  return (
    <>
      {projectContext.projectInfo ? 
      <>
        <Navbar />
        <br />
        <div className="map">
          <div className="map-c">
            <h1>{projectContext.projectInfo.title}</h1>
            <p>{projectContext.projectInfo.description}</p>
            <div className="det">
              <p>
                <i className="fa fa-map-marker"></i> <h2>Location</h2>
               Latitude: {`${((projectContext.projectInfo || {}).location || {}).lat || null}`}, 
               Longitude: {`${((projectContext.projectInfo || {}).location || {}).lng || null}`}
              </p>
              <p>
                <i className="fas fa-user-tie"></i>
                <h2>Client</h2>
               { projectContext.projectInfo.client}
              </p>
              <div className="row">
                <div className="col-sm-6">
                  <p>
                    <i className="far fa-clock"></i>

                    <h2>Start Date</h2>
                    <span className="date">{ projectContext.projectInfo.startDate.slice(0,10)}</span>
                  </p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <i className="far fa-clock"></i>
                    <h2>End Date</h2>

                    <span className="date">{ projectContext.projectInfo.endDate.slice(0,10)}</span>
                  </p>
                </div>
              </div>
              <p>
                <i className="fas fa-users"></i>
                <h2>Team Members</h2>
                {projectContext.projectInfo.teamMembers.map((users) => (
                  <li className="users">{users[0].name}</li>
                ))}
              </p>
            </div>
          </div>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              options={mapOptions}
              center={mapCenter}
              zoom={12}
              id="map"
            >
              {markers.map((position) => (
                <Marker position={position}></Marker>
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </>
       : ("data not exist")} 
    </>
  );
};

export default Projects;
