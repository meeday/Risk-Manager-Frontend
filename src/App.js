import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserForm from "./components/userForm/userForm";
import Logout from './components/Logout/Logout';
import Login from "./components/login-signup/Login";
import Register from "./components/login-signup/Register";
import NewProjectAdd from "./components/newProjectAdd/index"

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* call the right component according to the end-point */}
          <Redirect exact from="/" to="/register"/>
          <Route exact path="/logout" render={() => (
              <UserForm>
                <Logout />
              </UserForm>
            )}
          />
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
          <Route exact path="/newprojectadd" render={() => (
              <UserForm>
                <NewProjectAdd />
              </UserForm>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
