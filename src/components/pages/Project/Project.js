import React from "react";
import { List, LinkItem } from "../../List/List";
import dotenv from "dotenv";
import Navbar from "../../Nav/Nav";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./styles/Project.css";
dotenv.config();

const risks = [
  { _id: "234iuhowef9803rh", title: "Bridge Issue" },
  { _id: "584pduablf9571qt", title: "Water Mains" },
  { _id: "584pduablfhjdskj", title: "test issue" },

];

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
  return (
    <>
      <Navbar />
      <br />
      <div className="map">
        <div className="map-c">
          <h1>Big Ben</h1>
          <p className="projectDetails">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium id cumque est dolores voluptatibus.
          </p>
          <div className="det">
            <p className="projectDetails">
              <i className="fa fa-map-marker icon"></i> <h2>Location</h2>
              Westminster, London SW1A 0AA
            </p>
            <p>
              <i className="fas fa-user-tie icon"></i>
              <h2>Client</h2>
              Arup
            </p>
            <div className="row">
              <div className="col-sm-6">
                <p className="projectDetails">
                  <i className="far fa-clock icon"></i>

                  <h2>Start Date</h2>
                  <span className="date">6/12/19</span>
                </p>
              </div>
              <div className="col-sm-6">
                <p className="projectDetails">
                  <i className="far fa-clock icon"></i>
                  <h2>End Date</h2>

                  <span className="date">12/11/20</span>
                </p>
              </div>
            </div>
            <p className="projectDetails">
              <i className="fas fa-users icon"></i>
              <h2>Team Members</h2>
              {teamMembers.map((users) => (
                <li className="users">{users}</li>
              ))}
            </p>
          </div>
        </div>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap id="map" options={mapOptions} center={mapCenter} zoom={12}>
            {markers.map((position) => (
              <Marker position={position}></Marker>
            ))}
          </GoogleMap>
        </LoadScript>
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
