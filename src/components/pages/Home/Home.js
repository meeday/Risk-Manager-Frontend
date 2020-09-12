import React, {useState, useEffect, useContext} from "react";
import { Tabs, Tab } from "react-bootstrap";
import AccountDashboard from "../AccountDashboard/AccountDashboard";
import Comments from "../../Comments/Comments";
import ProjectsList from "../../ProjectsList/ProjectsList";
import {ProjectContext} from "../../../Context/ProjectContext";
import Navbar from "../../Nav/Nav";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/Home.css";

function Home(props) {
  const { userRisks } = useContext(ProjectContext);

  return (
    <>
      <Navbar />
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        {/* eventkey is acting as the event listener the tabs won't change unless eventkey is specified but it doesn't need to be the same as the title */}
        <Tab eventKey="home" title="Dashboard">
          <AccountDashboard />
        </Tab>
        <Tab eventKey="Projects" title="Projects">
          <ProjectsList />
        </Tab>
        <Tab eventKey="comments" title="Comments">
          <Comments risks={userRisks} />
        </Tab>
      </Tabs>
    </>
  );
}

export default Home;
