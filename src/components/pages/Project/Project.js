// Import npm modules, components and methods
import React, { Component, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import dotenv from "dotenv";

// Import local files
import Navbar from "../../Nav/Nav";
import "./styles/Project.css";
import projectService from "../../../Services/ProjectService";
import { List, LinkItem } from "../../List/List";

// Configure dotenv for environment variables
dotenv.config();

// ***** get projectId from context
const projectId = "5f53f1adeb1bd77a1004ba11";

const Projects = () => {
  // Set state
  const [projectRisks, setProjectRisks] = useState([]);
  const [selected, setSelected] = useState();

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  
  // Function which returns URL for a Google map marker of the color appropriate to the risk score 
  const markerColor = riskScore => {
    // Green marker (negligible risk)
    if (riskScore <= 4) {
      return 'http://maps.google.com/mapfiles/ms/micons/green.png';
    }
    // Orange marker (tolerable risk)
    if (riskScore <= 6) {
      return 'http://maps.google.com/mapfiles/ms/micons/orange.png';
    }
    // Red marker (intolerable risk)
    return 'http://maps.google.com/mapfiles/ms/micons/red.png';
  }

  // API call to get all all risks of the current project
  const getProjectRisks = async () => {
    try {
      const dataReturn = await projectService.getRisksByProjectId(projectId);
      const arrayData = dataReturn.data.projectRisks;
      
      setProjectRisks(arrayData);
    }
    catch (err) {
      console.log(`Error - getProjectRisks.js - getProjectRisks() - ${err}`);
    }
  }
  
  // Call the function which gets all users and sets to state
  useEffect(() => {
    getProjectRisks();
  }, []);

  // API call for risks
  const risks = [
    {
      title: 1,
      location: { lat: 52.479738, lng: -1.903979 },
    },
    {
      title: 2,
      location: { lat: 52.5, lng: -1.904408 },
    },
    {
      title: 3,
      location: { lat: 52.474744, lng: -1.888884 },
    },
  ];

  // ****** API request for members
  const teamMembers = ["Joe", "Niro", "Ian", "Meedaxa"];

  const mapCenter = {
    lat: 52.479161,
    lng: -1.895446,
  };

  return (
    <>
      <Navbar />
      <div className="map">
        <div className="row">
          <div className = "col-xs-12 col-sm-6">
            <div className="project-details">
              <h1>Big Ben</h1>
              <div className="data-block">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusantium id cumque est dolores voluptatibus.
                </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="data-block">
                    <i className="fa fa-map-marker"></i> 
                    <h2>Latitude</h2>
                    <span className="project-content">52.475</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="data-block">
                    <h2>Longitude</h2>
                    <span className="project-content">-1.900</span>
                  </div>
                </div>
              </div>
              <div className="data-block">
                <i className="fas fa-user-tie"></i>
                <h2>Client</h2>
                <span className="project-content">Arup</span>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="data-block">
                    <i className="far fa-clock"></i>
                    <h2>Start Date</h2>
                    <span className="project-content">6/12/19</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="data-block">
                    <h2>End Date</h2>
                    <span className="project-content">12/11/20</span>
                  </div>
                </div>
              </div>
              <div className="data-block">
                <i className="fas fa-users"></i>
                <h2>Team Members</h2>
                <div className="project-content">
                  {teamMembers.map((user) => (
                    <li className="users">{user}</li>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className = "col-xs-12 col-sm-6">
            <div className="map-container">
              <h1>Risks</h1>
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap options={mapOptions} center={mapCenter} zoom={12} id="map">
                  {projectRisks.map(risk => (
                    <Marker 
                      key={risk._id}
                      position={risk.location}
                      icon={markerColor(risk.risk)}
                      title={risk.title}
                      onClick={() => {
                        setSelected(risk)
                      }}
                    />
                  ))}

                  {selected ? (
                    <InfoWindow position={{lat: selected.location.lat, lng: selected.location.lng}} onCloseClick={() => {
                      setSelected(null);
                    }}>
                      <div className="info-text">
                        <h2>{selected.title}</h2>
                        <p>Likelihood: {selected.likelihood}</p>
                        <p>Severity: {selected.severity}</p>
                        <p>Risk score: {selected.risk}</p>
                        <a href={`/project/${selected.projectId}/risk/${selected._id}`}>Go to risk</a>
                      </div>

                    </InfoWindow>
                  ) : null}

                </GoogleMap>
              </LoadScript>
              <div className="row">
                <div className="col-4 key">
                  <img className="key-icon" src={markerColor(1)}></img><span className="key-definition">negligible</span>
                </div>
                <div className="col-4 key">
                  <img className="key-icon" src={markerColor(6)}></img><span className="key-definition">tolerable</span>
                </div>
                <div className="col-4 key">
                  <img className="key-icon" src={markerColor(10)}></img><span className="key-definition">intolerable</span>
                </div>
              </div>
              <button className="btn btn-primary add btn-center">
                <a href="new-risk">Add Risk</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="riskList">
        <h1 className="text-center">Project Risks</h1>
        <List className="listItems">
          {risks.map((risk) => (
            <a href={"13124/risk/" + risk._id}>
              <LinkItem className="btn btn-primary riskItem" key={risk._id}>
                {risk.title}
              </LinkItem>
            </a>
          ))}
        </List>
      </div>
    </>
  );
};

export default Projects;
