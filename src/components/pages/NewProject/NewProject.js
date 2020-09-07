// NPM import
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/NewProject.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

// Component
import Years from "./components/Years";
import Months from "./components/Months";
import ProjectName from "./components/ProjectName";
import Client from "./components/Client";
import Description from "./components/Description";
import Dates from "./components/Dates";
import MemberList from "./components/MemberList";

// API route
import projectService from "../../../Services/ProjectService";

// Config
import { config } from "../../../config";

function NewProject(props) {
  // ---Initialization---


  
  // ******* mapCentre will need to be retrieved
  let mapCentre = {
    lat: 52.475,
    lng: -1.900,
  };

  // Declare hooks from useForm
  const { register, handleSubmit, errors } = useForm();
  const [members, setMembers] = useState([]);
  const [riskLocation, setRiskLocation] = useState(mapCentre);
  
  // Google Maps
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_API_KEY,
  });

  // Return errors or loading message if Google Maps does not load or is loading
  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return "Loading Google Maps";

  // Variables for year, month and date
  let years = [];
  let yearsMax = new Date().getFullYear() + 20;
  let yearsMin = new Date().getFullYear() - 5;
  let i;
  for (i = yearsMin; i < yearsMax + 1; i++) {
    years.push(i);
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let dates = [];
  const datesMin = 1;
  const datesMax = 31;
  let k;
  for (k = datesMin; k < datesMax + 1; k++) {
    dates.push(k);
  }

  // Google map API styling and options
  const mapContainerStyle = {
    minWidth: "200px",
    maxWidth: "90vw",
    minHeight: "250px",
    maxheight: "80vh",
    margin: "0 auto",
  };

  // Disable all Google Maps UI features. Activate zoom control
  const mapOptions = {
    disableDefaultUI: true,  
    zoomControl: true,
  }

  // ---Event Handler---

  // Google Map
  const handleLocationChange = event => {
    // Take the lat and long from Google Maps click event, rounded to 6.d.p
    setRiskLocation({
      lat: Math.floor(event.latLng.lat() * 1000000) / 1000000,
      lng: Math.floor(event.latLng.lng() * 1000000) / 1000000,
    });
  }

  // When Submit Button is Clicked
  const onSubmit = (user, e) => {
    const {
      startD,
      startMonth,
      startYear,
      endD,
      endMonth,
      endYear,
      client,
      description,
      locationLat,
      locationLng,
      title
    } = user;
    const newStartMonth = months.indexOf(startMonth) + 1;
    const newEndMonth = months.indexOf(endMonth) + 1;

    const startDate = `${startYear}/${newStartMonth}/${startD}`;
    const endDate = `${endYear}/${newEndMonth}/${endD}`;
    const teamMembers = members;

    const newProject = {
      title,
      description,
      location: {
        lat: parseFloat(locationLat),
        lng: parseFloat(locationLng)
      },
      startDate,
      endDate,
      client,
      teamMembers
    };
    console.log(newProject);

    projectService.createProject(newProject)
      .then((res) => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(`Error - NewProject.js - onSubmit() - ${err}`);
      });
  };

  // Functions to handle user selecting and unselecting members of the project
  const membersAdd = (m) => {
    setMembers(oldMembers => [...oldMembers, m]);
  };

  const membersRemove = (m) => {
    const index = members.findIndex((mSaved) => mSaved === m);
    members.splice(index, 1);
    setMembers(members);
  };

  const onchange = (e) => {
    const data = {
      name: e.target.name,
      _id: e.target.id
    };
    if (e.target.type === "checkbox" && !e.target.checked) {
      membersRemove(data);
    } else {
      membersAdd(data);
    }
  };

  return (
    <div className="new-project-wrapper">
      <div className="new-project-inner">
        <h1>New project</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Project Details</h3>
          <div className="form-group row">
            <ProjectName register={register} />
            <Client register={register} />
          </div>

          <div className="form-group row">
            <Description register={register} />
          </div>

          <div>
            <br></br>
            <h6>Select risk location:</h6>
            <a 
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
                center={mapCentre}
                options={mapOptions}
                onClick={handleLocationChange}
                >
                <Marker position={{lat: riskLocation.lat, lng: riskLocation.lng}}/>
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
                >
              </input>
            </div>
            <div className="form-group col-6">
              <label>Longitude</label>
              <input 
                name="locationLng"
                className="form-control disabled-form"
                ref={register}
                value={riskLocation.lng}
                readOnly
              >
              </input>
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group col">
              <label>Start date</label>
              <div className="row">
                <div className="col-12">
                  <Dates
                    dates={dates}
                    name="startD"
                    register={register({
                      validate: (value) => value !== "DD",
                    })}
                  />
                </div>
                <div className="col-12">
                  <Months
                    months={months}
                    name="startMonth"
                    register={register({
                      validate: (value) => value !== "MM",
                    })}
                  />
                </div>
                <div className="col-12">
                  <Years
                    years={years}
                    name="startYear"
                    register={register({
                      validate: (value) => value !== "YYYY",
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group col">
              <label>End date</label>
              <div className="row">
                <div className="col-12">
                  <Dates
                    dates={dates}
                    name="endD"
                    register={register({
                      validate: (value) => value !== "DD",
                    })}
                  />
                </div>
                <div className="col-12">
                  <Months
                    months={months}
                    name="endMonth"
                    register={register({
                      validate: (value) => value !== "MM",
                    })}
                  />
                </div>
                <div className="col-12">
                  <Years
                    years={years}
                    name="endYear"
                    register={register({
                      validate: (value) => value !== "YYYY",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col">
              <label>Team Member</label>
              {/* Need to pass id in it later when get request form */}
              <MemberList onchange={onchange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>

      </div>
    </div>
  );
}

export default NewProject;
