import React from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectsList.css";
const projects = [ {_id: "234iuhowef9803rh", title: "Big Ben" }, {_id: "584pduablf9571qt", title: "London Bridge" } ]
export default function ProjectList(props) {
  return (
    <div className="projectList">
      <List className="list">
        {projects.map((project) => (
          <a href={"project/" + project._id}>
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
