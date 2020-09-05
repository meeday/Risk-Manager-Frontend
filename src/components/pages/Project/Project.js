import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/Project.css";

function Project(props) {
  return (
    <div className="d-block">
        <h1>Project name</h1>
        <h2>Risks:</h2>
        <li><a href="/project/234iuhowef9803rh/risk/5f52a6cc0c5677512c956de9">Risk 1</a></li>
        <li><a href="/project/234iuhowef9803rh/risk/5f52a6cc0c5677512c956dea">Risk 2</a></li>
        <li><a href="/project/234iuhowef9803rh/risk/5f52a6cc0c5677512c956deb">Risk 3</a></li>
        <div>
          <h3>Map placeholder</h3>
        </div>
        <button><a href="/project/234iuhowef9803rh/new-risk">New Risk</a></button>
    </div>
  );
}

export default Project;
