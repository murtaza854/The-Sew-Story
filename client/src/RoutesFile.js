import React, { useEffect, useState } from 'react';
import {
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import { MainNavbar, Footer, BlackBar } from './components';
import { Home, Story, Products, ProductPage, Signup, Login, ForgotPassword, Cart, CheckoutForm, OrderMessage, Contact, Gallery, Invoice } from './pages';
import Auth from './auth/Auth';
// import { ComingSoon } from './pages';
import { Dashboard } from './dashboard';
// import CartContext from './contexts/cart';
// import DiscountContext from './contexts/discount';
// import api from './api';
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
//   import './App.scss';
import './form.scss';
import './global.scss';
import api from './api';
import UserContext from './contexts/userContext';
import CartCountContext from './contexts/cartCountContext';
// import { Dashboard } from './dashboard';

function RoutesFile(props) {
    const [userState, setUserState] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);

    let location = useLocation();

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

    let positionStyle = 'relative';
    if (location.pathname === '/') positionStyle = 'absolute';

    return (
        <UserContext.Provider value={{ userState: userState, setUserState: setUserState }}>
          <CartCountContext.Provider value={{ cartCount: cartCount, setCartCount: setCartCount }}>
        <div>
            {/* <MainNavbar /> */}
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}
                >
                    <div className="page">
                        <MainNavbar positionStyle={positionStyle} />
                        <Switch location={location}>
                            <Route path="/__/auth/action">
                                <Auth />
                            </Route>
                            <Route path="/dashboard/account">
                                <Dashboard />
                            </Route>
                            <Route path="/order/status">
                                <OrderMessage />
                            </Route>
                            <Route path="/:categorySlug/:productSlug">
                                <ProductPage />
                            </Route>
                            {/* <Route path="/payment">
                                <Payment />
                            </Route> */}
                            <Route path="/payment">
                                <Invoice />
                            </Route>
                            <Route path="/gallery">
                                <Gallery />
                            </Route>
                            <Route path="/contact">
                                <Contact />
                            </Route>
                            <Route path="/cart">
                                <Cart />
                            </Route>
                            <Route path="/forgot-password">
                                <ForgotPassword />
                            </Route>
                            <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/checkout">
                                <CheckoutForm />
                            </Route>
                            {/* <Route path="/products">
                                <Products />
                            </Route> */}
                            <Route path="/our-story">
                                <Story />
                            </Route>
                            <Route path="/:productSlug">
                                <Products />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                        <Footer />
                        <BlackBar />
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
      </CartCountContext.Provider>
    </UserContext.Provider>
        //   {/* </DiscountContext.Provider>
        // </CartContext.Provider> */}
    );
}

export default RoutesFile;
