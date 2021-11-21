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
import CartCountContext from './contexts/cartCountContext';
import api from './api';
import { Admin } from './admin';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
// import Auth from './auth/Auth';
// import api from './api';

function App() {
  const [userState, setUserState] = useState(null);
  const [cartCount, setCartCount] = useState(0);
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
      <CartCountContext.Provider value={{ cartCount: cartCount, setCartCount: setCartCount }}>
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
      </CartCountContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
