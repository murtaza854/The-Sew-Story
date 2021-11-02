import React, { useEffect } from 'react';
import {
    Switch,
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

function Routes(props) {
    //   const [cart, setCart] = useState({ data: {}, count: 0 });
    //   const [discountState, setDiscountState] = useState(null);
    //   const [navOptions, setNavOptions] = useState([]);
    //   const [mainNavOptions, setMainNavOptions] = useState([]);

    let location = useLocation();

    useEffect(() => {
        (
            async () => {
                // setDiscountState(null);
                // const response = await fetch(`${api}/category/client-categories`, {
                //   method: 'GET',
                //   headers: {
                //     'Content-Type': 'application/json',
                //     'Cache-Control': 'no-store'
                //   },
                //   credentials: 'include',
                //   withCredentials: true,
                // });
                // const content = await response.json();
                // // console.log(content);
                // try {
                //   const data = content.data;
                //   const options = [
                //     {
                //       content: [{ id: 1, name: "Brands", to: "/brands" }]
                //     },
                //   ];
                //   const mainNav = [
                //     { name: "Brands", to: "/brands" }
                //   ];
                //   data.forEach(category => {
                //     const newCat = {
                //       hideBorder: false,
                //       content: [
                //         {
                //           id: category._id,
                //           name: category.name,
                //         }
                //       ]
                //     };
                //     const mainNewCat = {
                //       name: category.name,
                //       to: `/${category.slug}`
                //     }
                //     if (category.subCategories.length === 0) {
                //       newCat.content[0]['to'] = `/${category.slug}`;
                //     } else {
                //       newCat.content[0]['children'] = [
                //         {
                //           content: [
                //             { id: category._id, name: `All ${category.name}`, to: `/${category.slug}` }
                //           ]
                //         }
                //       ];
                //       mainNewCat['children'] = [];
                //       category.subCategories.forEach(subCategory => {
                //         const newSubCat = {
                //           id: subCategory._id,
                //           name: subCategory.name,
                //         }
                //         const mainNewSubCat = {
                //           name: subCategory.name,
                //           to: `/${category.slug}/${subCategory.slug}`
                //         }
                //         if (subCategory.furtherSubCategories.length === 0) {
                //           newSubCat['to'] = `/${category.slug}/${subCategory.slug}`;
                //         } else {
                //           newSubCat['children'] = [
                //             {
                //               content: [
                //                 { id: subCategory._id, name: `All ${subCategory.name}`, to: `/${category.slug}/${subCategory.slug}` }
                //               ]
                //             }
                //           ];
                //           mainNewSubCat['children'] = [];
                //           subCategory.furtherSubCategories.forEach(furtherSubCategory => {
                //             const newFurtherSubCat = { id: furtherSubCategory._id, name: furtherSubCategory.name, to: `/${category.slug}/${subCategory.slug}/${furtherSubCategory.slug}` };
                //             const mainNewFurtherSubCat = { name: furtherSubCategory.name, to: `/${category.slug}/${subCategory.slug}/${furtherSubCategory.slug}` };
                //             newSubCat['children'][0].content.push(newFurtherSubCat);
                //             mainNewSubCat['children'].push(mainNewFurtherSubCat);
                //           });
                //         }
                //         newCat.content[0]['children'][0].content.push(newSubCat);
                //         mainNewCat['children'].push(mainNewSubCat);
                //       });
                //     }
                //     options.push(newCat);
                //     mainNav.push(mainNewCat);
                //   });
                //   options.push(
                //     {
                //       content: [{ id: 2, name: "Pre-Orders", to: "/pre-orders" }]
                //     }
                //   );
                //   options.push(
                //     {
                //       content: [{ id: 2, name: "SALE", to: "/sale" }]
                //     }
                //   );
                //   mainNav.push(
                //     { name: "Pre-Orders", to: "/pre-orders" }
                //   );
                //   mainNav.push(
                //     { name: "SALE", to: "/sale" }
                //   );
                //   setNavOptions(options);
                //   setMainNavOptions(mainNav);
                // } catch (error) {
                // }
            })();
    }, []);

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
                        <Switch location={location}>
                            {/* <Route path="/__/auth/action">
                                <MainNavbar />
                                <Auth />
                            </Route>
                            <Route path="/dashboard/account">
                                <MainNavbar />
                                <Dashboard />
                            </Route>
                            <Route path="/:category/:startup">
                                <MainNavbar />
                                <Business />
                            </Route>
                            <Route path="/forgot-password">
                                <MainNavbar />
                                <ForgotPassword />
                            </Route>
                            <Route path="/premium">
                                <MainNavbar />
                                <Premium />
                            </Route>
                            <Route path="/packages">
                                <MainNavbar />
                                <PackageSelection />
                            </Route>
                            <Route path="/signup">
                                <MainNavbar />
                                <Signup />
                            </Route>
                            <Route path="/login">
                                <MainNavbar />
                                <Login />
                            </Route>
                            <Route path="/setup">
                                <MainNavbar />
                                <Setup
                                    title="Your Journey Starts Here!"
                                    edit={false}
                                />
                            </Route>
                            <Route path="/:category">
                                <MainNavbar />
                                <Businesses />
                            </Route>
                            <Route path="/">
                                <MainNavbar />
                                <Home />
                            </Route> */}
                        </Switch>
                        {/* <div className="margin-global-top-8" /> */}
                        {/* <IconBanner />
                        <Footer /> */}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
        //   {/* </DiscountContext.Provider>
        // </CartContext.Provider> */}
    );
}

export default Routes;
