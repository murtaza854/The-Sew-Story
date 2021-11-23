import React, { useContext, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
// import { GiHamburgerMenu } from 'react-icons/gi';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import { withStyles } from '@mui/styles';
import UserContext from '../../contexts/userContext';
import CartCountContext from '../../contexts/cartCountContext';
import './MainNavbar.scss';
import Sidebar from '../sidebar/Sidebar';

const styles = _ => ({
    customBadge: {
        backgroundColor: "black",
        color: "white"
    }
});

function SimpleBadge(props) {
    const { classes, count } = props;
    return (
        <div>
            <Badge
                classes={{ badge: classes.customBadge }}
                badgeContent={count}
            >
                <RiShoppingBag2Fill className="cart-icon" />
            </Badge>
        </div>
    );
}

const StyledBadge = withStyles(styles)(SimpleBadge);

function MainNavbar(props) {
    const user = useContext(UserContext);
    const cartCountFromContext = useContext(CartCountContext);
    // const [cartCount] = useState(cartCountFromContext.cartCount);

    useEffect(() => {
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        if (cartProducts) {
            cartCountFromContext.setCartCount(cartProducts.length);
        }
    }, [cartCountFromContext])

    const onClickHamburger = () => {
        const sidebar = document.getElementById('client-sidebar');
        const check = sidebar.classList.contains('client-sidebar-closed');
        const notActive = sidebar.classList.contains('client-sidebar-not-active');
        if (notActive) {
            sidebar.classList.remove('client-sidebar-not-active');
            sidebar.classList.add('client-sidebar-open');
        } else {
            if (check) {
                sidebar.classList.remove('client-sidebar-closed');
                sidebar.classList.add('client-sidebar-open');
            } else {
                sidebar.classList.add('client-sidebar-closed');
                sidebar.classList.remove('client-sidebar-open');
            }
        }
    }

    return (
        <div style={{ position: props.positionStyle }} className="main-navbar">
            <Navbar bg="transparent">
                <Container>
                    <div className="navbar-brand">
                        <MenuIcon id="client-sidebar-hamburger" className="hamburger-icon" onClick={onClickHamburger} />
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
                            <StyledBadge count={cartCountFromContext.cartCount} />
                            {/* <Badge badgeContent={4} color="primary">
                                <RiShoppingBag2Fill className="cart-icon" />
                            </Badge> */}
                        </Link>
                    </div>
                </Container>
            </Navbar>
            <Container>
                <div className="main-navbar-bottom-line center-relative-horizontal" />
            </Container>
            <Sidebar />
        </div>
    );
}

export default MainNavbar;