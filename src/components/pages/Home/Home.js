import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import AccountDashboard from "../AccountDashboard/AccountDashboard";
import Comments from "../../Comments/Comment";
import ProjectList from "../../ProjectsList/ProjectList";
import Navbar from "../../Nav/Nav";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/Home.css";

function Home(props) {
  return (
    <>
      <Navbar />
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Dashboard">
          <AccountDashboard />
        </Tab>
        <Tab eventKey="Projects" title="Projects">
          <ProjectList />
        </Tab>
        <Tab eventKey="comments" title="Comments">
          <Comments />
        </Tab>
      </Tabs>
    </>
  );
}

export default Home;
