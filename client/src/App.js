import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';
import RoutesFile from './RoutesFile';
// import { Admin } from './admin';
import UserContext from "./contexts/userContext";
import api from './api';
import { Admin } from './admin';
// import Auth from './auth/Auth';
// import api from './api';

function App() {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${api}/logged-in`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            withCredentials: true,
          });
          const content = await response.json();
          const user = content.data;
          const { displayName, email, emailVerified, admin } = user;
          setUserState({ displayName, email, emailVerified, admin });
          setLoading(false);
        } catch (error) {
          setUserState(null);
          setLoading(false);
        }
      })();
  }, []);

  if (loading) return <div></div>

  return (
    <UserContext.Provider value={{ userState: userState, setUserState: setUserState }}>
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin loading={loading} />
          </Route>
          <Route path="*">
            <RoutesFile />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
