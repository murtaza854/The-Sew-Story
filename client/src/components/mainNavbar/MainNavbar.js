import React, { useContext, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import Badge from '@mui/material/Badge';
import { withStyles } from '@mui/styles';
import UserContext from '../../contexts/userContext';
import CartCountContext from '../../contexts/cartCountContext';
import './MainNavbar.scss';

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
        </div>
    );
}

export default MainNavbar;