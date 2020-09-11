import React, {useState, useEffect} from "react";
import { Tabs, Tab } from "react-bootstrap";
import AccountDashboard from "../AccountDashboard/AccountDashboard";
import AuthService from "../../../Services/AuthService";
import Comments from "../../Comments/Comment";
import ProjectsList from "../../ProjectsList/ProjectsList";
import Navbar from "../../Nav/Nav";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/Home.css";

function Home(props) {

  const [user, setUser] = useState();
  const [project, setProject] = useState(null);
  const getData = async () => {
    try {
      const {data} = await AuthService.getInfo("5f5a1ef56157b937082c4229");
      setUser(data.firstName + " " + data.lastName);
      setProject(data.project.length);
    }
    catch (err) {
      console.log(`Error - Home.js = getData() - ${err}`);
    }
  }
  
  useEffect(() => {
    getData({});
  }, []);
  

  return (
    <React.Fragment>
      <Navbar />
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        {/* eventkey is acting as the event listener the tabs won't change unless eventkey is specified but it doesn't need to be the same as the title */}
        <Tab eventKey="home" title="Dashboard">
          <AccountDashboard  username={user} project={project} />
        </Tab>
        <Tab eventKey="Projects" title="Projects">
          <ProjectsList />
        </Tab>
        <Tab eventKey="comments" title="Comments">
          <Comments />
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}

export default Home;
