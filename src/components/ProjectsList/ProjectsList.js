import React from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectsList.css";
const projects = [ {_id: "234iuhowef9803rh", title: "Big Ben" }, {_id: "584pduablf9571qt", title: "London Bridge" } ]
export default function ProjectList() {
  return (
    <div className="projectList">
      <List className="list">
        {projects.map((project) => (
          <LinkItem className="listItem btn btn-primary" href={"project/" + project._id} key={project._id}>
           {project.title}
          </LinkItem>
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
