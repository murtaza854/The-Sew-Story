import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';
import RoutesFile from './RoutesFile';
import { Admin } from './admin';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
// import Auth from './auth/Auth';
// import api from './api';

function App() {

  return (
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="*">
            <RoutesFile />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
