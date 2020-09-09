import React, { useEffect, useState } from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectsList.css";
import ProjectService from "../../Services/ProjectService";

export default function ProjectList(props) {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const allProjects = await ProjectService.getAllProjects();
      const Model = allProjects.data.projectsData;
      setProjects(Model);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjects();
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
        <button type="submit" className="btn btn-primary add">
          Add Project
        </button>
      </div>
    </div>
  );
}
