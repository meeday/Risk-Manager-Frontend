import React from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectList.css";
const projects = [
  "project 1",
  "project 2",
  "project 3",
  "project 4",
  "project 5",
];
export default function ProjectList() {
  return (
    <div className="projectList">
      <List className="list">
        {projects.map((project) => (
          <LinkItem className="listItem btn btn-primary" href={`project-${project.id}`} key={project._id}>
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
