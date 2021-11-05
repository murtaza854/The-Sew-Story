import React from 'react';
import {
    Routes,
    // Route,
    useLocation,
} from "react-router-dom";
// import { MainNavbar, IconBanner, Footer } from './components';
// import { Home, Signup, Login, Setup, Businesses, Business, PackageSelection, Premium, ForgotPassword } from './pages';
// import Auth from './auth/Auth';
// import { ComingSoon } from './pages';
// import { Dashboard } from './dashboard';
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

    return (
        // <CartContext.Provider value={{ cartObj: cart, setCart: setCart }}>
        //   <DiscountContext.Provider value={discountState}>
        //     <SmallBanner />
        //     <div className="margin-global-top-1" />
        //     <SearchNavbar options={navOptions} />
        // {/* <div className="margin-global-top-1" /> */}
        <div>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}
                >
                    <div className="page">
                        <Routes location={location}>
                            {/* <Route path="/__/auth/action">
                                <MainNavbar />
                                <Auth />
                            </Route> */}
                            {/* <Route path="/dashboard/account">
                                <MainNavbar />
                                <Dashboard />
                            </Route> */}
                            {/* <Route path="/forgot-password">
                                <MainNavbar />
                                <ForgotPassword />
                            </Route> */}
                            {/* <Route path="/signup">
                                <MainNavbar />
                                <Signup />
                            </Route> */}
                            {/* <Route path="/login">
                                <MainNavbar />
                                <Login />
                            </Route> */}
                            {/* <Route path="/">
                                <MainNavbar />
                                <Home />
                            </Route> */}
                        </Routes>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
        //   {/* </DiscountContext.Provider>
        // </CartContext.Provider> */}
    );
}

export default RoutesFile;
