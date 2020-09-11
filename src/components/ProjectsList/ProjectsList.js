import React, { useEffect, useState, useContext } from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectsList.css";
import ProjectService from "../../Services/ProjectService";
import { AuthContext } from "../../Context/AuthContext";

export default function ProjectList(props) {
  const authContext = useContext(AuthContext);
  const id= (((authContext || {}).userInfo || {}).user || {})._id || null;
  
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null)

  const userProjects = async (id) => {
    try {
      const userProjectData =   await ProjectService.getProjectByUserId(id);
      console.log(userProjectData);      
    } catch (error) {
      console.log(error);
    }
  }

  const getProjects = async () => {
    try {
      const allProjects = await ProjectService.getAllProjects();
      // console.log(allProjects);
      const Model = allProjects.data.projectsData;
      setProjects(Model);
    } catch (error) {
      console.log(`Error - ProjectsList.js - getProjects() - ${error}`);
    }
  };
  useEffect(() => {
    getProjects();
    userProjects()
  }, []);

  return (
    <div className="projectList">
      <List className="list">
        {projects.map((project) => (
          <a href={"project/" + project._id} key={project._id}>
            <LinkItem className="listItem btn btn-primary" key={project._id}>
              {project.title}
            </LinkItem>
          </a>
        ))}
      </List>
      <div className="text-center">
        <button className="btn btn-primary add">
          <a href="/new-project">Add Project</a>
        </button>
      </div>
    </div>
  );
}
