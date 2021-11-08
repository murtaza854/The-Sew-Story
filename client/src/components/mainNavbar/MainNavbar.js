import React, { useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import './MainNavbar.scss';
import UserContext from '../../contexts/userContext';

function MainNavbar(props) {
    const user = useContext(UserContext);
    return (
        <div style={{ position: props.positionStyle }} className="main-navbar">
            <Navbar bg="transparent">
                <Container>
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/logo.png" alt="The Sew Story" />
                        </Link>
                    </div>
                    <div className="nav-icons">
                        {/* <div className="flag-cont">
                            <img src="/flag.png" alt="USA Flag" />
                            <p>USD</p>
                        </div> */}
                        {
                            user?.userState ? (
                                <Link to="/dashboard/account">
                                    <FaUser className="user-icon" />
                                </Link>
                            ) : (
                                <Link to="/signup">
                                    <FaUser className="user-icon" />
                                </Link>
                            )
                        }
                        <Link to="/cart">
                            <RiShoppingBag2Fill className="cart-icon" />
                        </Link>
                    </div>
                </Container>
            </Navbar>
            <Container>
                <div className="main-navbar-bottom-line center-relative-horizontal" />
            </Container>
        </div>
    );
}

export default MainNavbar;