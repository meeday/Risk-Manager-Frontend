import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/ExistingRisk.css";

function ExistingRisk(props) {
  return (
    <div>
      <h1>Risk ID X</h1>
      <h2>Title: .....</h2>
      <p>Description: ....</p>
      <p>Date raised</p>
      <p>Owned by: discipline X</p>
      <p>Risk likelihood: score</p>
      <p>Risk severity: score</p>

      <div>
        <p>Map placeholder</p>
      </div>

    </div>
  );
}

export default ExistingRisk;
