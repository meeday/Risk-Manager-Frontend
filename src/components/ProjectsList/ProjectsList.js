import React, { useEffect, useState } from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectsList.css";
import projectService from "../../Services/ProjectService";

export default function ProjectList() {

  const [projects, setProjects] = useState([]);

  
  const getProject = async() => {
    try {
      const dataReturn = await projectService.getAllProjects();
      const arrayData = dataReturn.data.projectsData;

      setProjects(arrayData);
    }
    catch (err) {
      console.log(err);
    }
  } 

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="projectList">
      <List className="list">
        {projects.map((project) => (
          <a href={"project/" + project._id} key={project._id}>
            <LinkItem className="listItem btn btn-primary">
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
