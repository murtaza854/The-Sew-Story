import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ImCancelCircle } from 'react-icons/im';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar(props) {
    const activeClass = {
        home: '',
        owner: '',
        items: '',
        email: '',
        password: ''
    };
    if (window.location.pathname === '/dashboard/account') activeClass.home = 'active';
    else if (window.location.pathname === '/dashboard/account/change-email') activeClass.email = 'active';
    else if (window.location.pathname === '/dashboard/account/change-password') activeClass.password = 'active';
    else if (window.location.pathname === '/dashboard/account/owner-info') activeClass.owner = 'active';
    else if (window.location.pathname === '/dashboard/account/items') activeClass.items = 'active';

    const closeFilterPanel = _ => {
        document.getElementById('dashboard-sidebar').classList.remove('active-dashboard-sidebar');
        document.getElementById('dashboard-sidebar').classList.add('remove-dashboard-sidebar');
    }

    return (
        <Col id="dashboard-sidebar" md={2} className="dashboard-sidebar">
            <ImCancelCircle onClick={closeFilterPanel} className="unhide-1200 close-icon" />
            <div className="margin-global-top-3" />
            <Row className="link-row text-center">
                <Link className={activeClass.home} to="/dashboard/account">Home</Link>
                <Link className={activeClass.owner} to="/dashboard/account/profile">Profile</Link>
                {/* <Link className={activeClass.items} to="/dashboard/account/orders">Orders</Link> */}
                <Link className={activeClass.email} to="/dashboard/account/change-email">Change Email</Link>
                <Link className={activeClass.password} to="/dashboard/account/change-password">Change Password</Link>
            </Row>
            <div className="margin-global-top-3" />
        </Col>
    );
}

export default Sidebar;