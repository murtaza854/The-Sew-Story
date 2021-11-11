import React from 'react';
import { Link } from 'react-router-dom';
import './ProductBox.scss';

function ProductBox(props) {
    return (
        <div className={`product-box ${props.className}`}>
            {
                props.product ? (
                    <Link to={`/${props.product.category.slug}/${props.product.slug}`} className={`product-box-link`}>
                        <div className="product-box__image">
                            <div className="product-box__category">
                                <h3>{props.product.name}</h3>
                            </div>
                            <img src={props.product.image} alt={props.product.name} />
                        </div>
                    </Link>
                ) : (
                    <Link to={`/${props.category.slug}`} className={`product-box-link`}>
                        <div className="product-box__image">
                            <div className="product-box__category">
                                <h3>{props.category.name}</h3>
                            </div>
                            <img src={props.category.image} alt={props.category.name} />
                        </div>
                    </Link>
                )
            }
        </div>
    );
}

export default ProductBox;