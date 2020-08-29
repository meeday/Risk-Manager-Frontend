import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/Home.css";

function Home(props) {
  return (
    <div>
      <h1>Name of user</h1>
      <h2>Summary - numbers of projects and risks</h2>
      <li><a>Project 1</a></li>
      <li><a>Project 2</a></li>
      <li><a>Project 3</a></li>
      <button><a href="/home/new-project">Create a new project</a></button>
    </div>
  );
}

export default Home;
