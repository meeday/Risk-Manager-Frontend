import React, { useEffect, useState, useContext } from "react";
import { List, LinkItem } from "../List/List";
import "./ProjectsList.css";
import ProjectService from "../../Services/ProjectService";
import { AuthContext } from "../../Context/AuthContext";
import { ProjectContext } from "../../Context/ProjectContext";

export default function ProjectList(props) {
  const { IdValue } = useContext(AuthContext);
  const { projectInfo, setProjectInfo } = useContext(ProjectContext);
  const { userRisks, setUserRisks } = useContext(ProjectContext);
  const { singleProject, setSingleProject } = useContext(ProjectContext);
  const { projectRisk, setProjectRisk} = useContext(ProjectContext);
  

  const handleProjectClick = async (projectData) => {
    try {
      setSingleProject(projectData);
      console.log(singleProject);
      const { data } = await ProjectService.getRisksByProjectId(
        projectData._id
      );
      setProjectRisk(data);
    } catch (error) {
      console.log(error);
    }
  };
  const userProjects = async () => {
    try {
      const { data } = await ProjectService.getProjectByUserId(IdValue.userId);
      setProjectInfo(data.usersProjects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userProjects();
  }, []);

  return (
    <div className="projectList">
      <List className="list">
        {projectInfo
          ? projectInfo.map((project) => (
              <a
                onClick={ () =>{(handleProjectClick(project))}}
                href={"project/" + project._id}
                key={project._id}
              >
                <LinkItem
                  className="listItem btn btn-primary"
                  key={project._id}
                >
                  {project.title}
                </LinkItem>
              </a>
            ))
          : null}
      </List>
      <div className="text-center">
        <button className="btn btn-primary add">
          <a href="/new-project">Add Project</a>
        </button>
      </div>
    </div>
  );
}
