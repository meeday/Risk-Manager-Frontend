import React from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectList.css";
const projects = ["project 1", "project 2", "project 3", "project 4", "project 5"];
export default function ProjectList() {
  return (
    <div className="projectList">
      <List className="list">
        {projects.map((project) => (
          <LinkItem className="listItem" href={project} key={project}>
            {project}
          </LinkItem>
        ))}
      </List>
    </div>
  );
}
