import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Routes from './Routes';
// import { Admin } from './admin';
import UserContext from "./contexts/userContext";
// import Auth from './auth/Auth';
// import api from './api';
import './App.scss';

function App() {
  return (
    <UserContext.Provider value={null}>
      <Router>
        <Switch>
          {/* <Route path="/admin">
            <Admin loading={loading} />
          </Route> */}
          <Route path="*">
            <div id="overlay" className="overlay"></div>
            <Routes />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
