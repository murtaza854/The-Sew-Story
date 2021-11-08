import React from 'react';
import { Link } from 'react-router-dom';
import './ProductBox.scss';

function ProductBox(props) {
    return (
        <div className={`product-box ${props.className}`}>
        <Link to={`/${props.product.slug}`} className={`product-box-link`}>
            <div className="product-box__image">
                <img src={props.product.image} alt={props.product.name} />
            </div>
        </Link>
        </div>
    );
}

export default ProductBox;