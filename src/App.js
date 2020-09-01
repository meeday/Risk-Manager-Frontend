import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserForm from "./components/userForm/UserForm";
import Logout from './components/LogoutButton/LogoutButton';
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Home from "./components/pages/Home/Home";
import NewProject from "./components/pages/NewProject/NewProject";
import Project from "./components/pages/Project/Project";
import NewRisk from "./components/pages/NewRisk/NewRisk";
import ExistingRisk from "./components/pages/ExistingRisk/ExistingRisk";
import AccountDashboard from "./components/pages/AccountDashboard/AccountDashboard";
import AuthProvider from './Context/AuthContext'
import "./App.css";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" render={() => (
            <UserForm>
                <Login history={props.history}/>
              </UserForm>
            )}
            />
          <Route exact path="/register" render={() => (
            <UserForm>
                <Register />
              </UserForm>
            )}
          />
          {/* Wrap AuthProvider round restricted routes so they don't render if user isn't logged in */}
          {/* <AuthProvider> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/new-project" component={NewProject} />
            <Route exact path="/project/:projectId" component={Project} />
            <Route exact path="/project/:projectId/new-risk" component={NewRisk} />
            <Route exact path="/project/:projectId/risk/:riskId" component={ExistingRisk} />
            <Route exact path="/account" component={AccountDashboard} />
          {/* </AuthProvider> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
