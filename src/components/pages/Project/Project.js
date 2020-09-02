import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/Project.css";

function Project(props) {
  return (
    <div className="d-block">
        <h1>Project name</h1>
        <h2>Risks:</h2>
        <li><a>Risk 1</a></li>
        <li><a>Risk 2</a></li>
        <li><a>Risk 3</a></li>
        <div>
          <h3>Map placeholder</h3>
        </div>
    </div>
  );
}

export default Project;
