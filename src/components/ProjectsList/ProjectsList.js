import React, { useContext } from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectsList.css";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";

export default function ProjectList(props) {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const projectList = userContext.userProjects;

  return (
    <div className="projectList">
      <List className="list">
        {projectList.map((project) => (
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
