import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss'

function Footer(props) {
    return (
        <footer className="footer-distributed">
            <div className="footer-left">
                <h3><span>theSewStory</span></h3>
                <p className="footer-links">
                    <Link to="/" className="link-1">Home</Link>
                    <Link to="/shop" className="link-2">Shop</Link>
                    <Link to="/our-story" className="link-3">Our Story</Link>
                    <Link to="/gallery" className="link-4">Gallery</Link>
                    <Link to="/contact" className="link-5">Contact Us</Link>
                    {/* <a href="/diy">DIY</a> */}
                    {/* <a href="/contact-us">Contact Us</a> */}
                </p>
                <p className="footer-company-name">The Sew Story © 2021</p>
            </div>
            <div className="footer-center">
                {/* <div>
            <i className="fa fa-map-marker" />
            <p><span>Address Line 1</span>Address Line 2</p>
          </div> */}
                {/* <div>
            <i className="fa fa-phone" />
            <p><span>Phone number</span></p>
          </div> */}
                <div className="special">
                    <i className="fa fa-envelope" />
                    <p><a href="mailto:info@thesewstory.com">info@thesewstory.com</a></p>
                </div>
            </div>
            <div className="footer-right">
                {/* <p className="footer-company-about">
            <span>About mzushi</span>
            Mzushi, your online local directory for the finest listings of food, clothes and all things homemade. Search for businesses, list your own, review site products or services and make the shift from yellow pages, today!
          </p> */}
                <div>
                    <a className="h-b" href="https://www.instagram.com/hexandbracket" target="_blank" rel="noopener noreferrer">
                        <img src="/h-b.jpg" alt="Hex & bracket" />
                    </a>
                </div>
                <div className="footer-icons">
                    <a rel="noreferrer" target="_blank" href="https://www.facebook.com/thesewstory"><i className="fa fa-facebook" /></a>
                    <a rel="noreferrer" target="_blank" href="https://pinterest.com/thesewstory"><i className="fa fa-pinterest" /></a>
                    <a rel="noreferrer" target="_blank" href="https://www.instagram.com/thesewstory/"><i className="fa fa-instagram" /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;