import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar, ChangeEmail, ChangePassword, DashboardHome, OwnerInfo, Items } from './components';
import { useHistory } from 'react-router';
import api from '../api';
// import { YellowButton } from '../components';
import UserContext from './../contexts/userContext'
import {
    // BrowserRouter as Router,
    Switch as RouterSwitch,
    Route,
} from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import './Dashboard.scss'

function Dashboard(props) {
    const user = useContext(UserContext);
    const history = useHistory();
    const [loggedInUser, setLoggedInUser] = useState(null);


    useEffect(() => {
        if (!user.userState) history.push('/login');
    }, [history, user.userState]);

    useEffect(() => {
        (async () => {
            if (user.userState) {
                const response = await fetch(`${api}/user/get-logged-in?email=${user.userState.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const content = await response.json();
                setLoggedInUser(content.data);
            }
        })()
    }, [user.userState]);

    // const logout = async (e, id) => {
    //     e.preventDefault();
    //     try {
    //         await fetch(`${api}/startup/logout`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         // history.push('/');
    //     } catch (error) {
    //         alert("Error logging out. Please contact support.")
    //     }
    // }
    if (loggedInUser === null) return <div></div>;
    const openFilterPanel = _ => {
        document.getElementById('dashboard-sidebar').classList.remove('remove-dashboard-sidebar');
        document.getElementById('dashboard-sidebar').classList.add('active-dashboard-sidebar');
        // document.body.classList.add('disable-scroll');
    }

    return (
        // <Container className="user-dashboard text-center margin-global-top-2">
        //     Dashboard under construction, Please check back after a while. Sorry for the inconvenience.
        //     <Row className="margin-global-top-2">
        //         <YellowButton
        //             to="/"
        //             text="Sign Out"
        //             classes="text-uppercase width-high horizontal-center-relative"
        //             onClick={logout}
        //             id=""
        //         />
        //     </Row>
        // </Container>
        <Container className="user-dashboard" fluid>
            <div className="margin-global-top-3" />
            <Row>
                <Sidebar />
                <div className="unhide-1200 filter-icon-btn-container">
                    <div className="dash-icon-btn">
                        <GiHamburgerMenu className="dash-open-icon" onClick={openFilterPanel} />
                    </div>
                </div>
                <Col>
                    <RouterSwitch>
                        <Route path="/dashboard/account/change-email" children={
                            <ChangeEmail
                                email={loggedInUser.email}
                            />
                        } />
                        <Route path="/dashboard/account/orders" children={
                            <Items
                            />
                        } />
                        <Route path="/dashboard/account/change-password" children={
                            <ChangePassword />
                        } />
                        <Route path="/dashboard/account/profile" children={
                            <OwnerInfo
                                ownerFirstName={loggedInUser.firstName}
                                ownerLastName={loggedInUser.lastName}
                            />
                        } />
                        <Route path="/dashboard/account" children={
                            <DashboardHome
                                ownerFirstName={loggedInUser.firstName}
                            />
                        } />
                        {/* <Route path="/dashboard/:model/add" children={<AdminForm />} />
                        <Route path="/dashboard/:model/delete" children={<DeleteConfirmation />} />
                        <Route path="/dashboard/:model" children={<EnhancedTable />} /> */}
                    </RouterSwitch>
                </Col>
            </Row>
        </Container >
    );
}

export default Dashboard;