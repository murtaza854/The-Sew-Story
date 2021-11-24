import React from 'react';
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
// import { Dashboard } from './dashboard';

function RoutesFile(props) {
    //   const [cart, setCart] = useState({ data: {}, count: 0 });
    //   const [discountState, setDiscountState] = useState(null);
    //   const [navOptions, setNavOptions] = useState([]);
    //   const [mainNavOptions, setMainNavOptions] = useState([]);

    let location = useLocation();

    let positionStyle = 'relative';
    if (location.pathname === '/') positionStyle = 'absolute';

    return (
        // <CartContext.Provider value={{ cartObj: cart, setCart: setCart }}>
        //   <DiscountContext.Provider value={discountState}>
        //     <SmallBanner />
        //     <div className="margin-global-top-1" />
        //     <SearchNavbar options={navOptions} />
        // {/* <div className="margin-global-top-1" /> */}
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
        //   {/* </DiscountContext.Provider>
        // </CartContext.Provider> */}
    );
}

export default RoutesFile;
