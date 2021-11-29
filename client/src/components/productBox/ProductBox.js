import React from 'react';
import { Link } from 'react-router-dom';
import './ProductBox.scss';

function ProductBox(props) {

    const onClick = e => {
        if (props.category && props.category.comingSoon) e.preventDefault();
        if (props.product && props.product.quantity === 0) e.preventDefault();
    };

    return (
        <div className={`product-box ${props.className}`}>
            {
                props.product ? (
                    <>
                        <Link onClick={onClick} to={`/${props.product.category.slug}/${props.product.slug}`} className={`product-box-link`}>
                            <div className="product-box__image">
                                {
                                    props.product.quantity === 0 ? (
                                        <div className="ribbon"><span>Out of Stock</span></div>
                                    ) : (
                                        <>
                                            {
                                                props.product.discountedPrice ? (
                                                    <div className="ribbon"><span>Sale - {props.product.value} off</span></div>
                                                ) : null
                                            }
                                        </>
                                    )
                                }
                                <div className="product-box__category">
                                    <h3>{props.product.name}</h3>
                                </div>
                                <img src={props.product.image} alt={props.product.name} />
                            </div>
                        </Link>
                        <div className="product-box__description text-center">
                            <h4>{props.product.shortDescription}</h4>
                            {
                                props.product.discountedPrice ? (
                                    <>
                                    <p className="margin-bottom-0">
                                        <span className="product-box__price-cut">{props.product.price}</span> - 
                                        <span className="product-box__discount"> {props.product.discountedPrice}</span>
                                    </p>
                                    {/* <p className="product-box__discount">{props.product.discountedPrice}</p> */}
                                    </>
                                ) : (
                                    <p  className="margin-bottom-0">{props.product.price}</p>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <Link onClick={onClick} to={`/${props.category.comingSoon ? '' : props.category.slug
                        }`} className={`product-box-link`}>
                        <div className="product-box__image">
                            <div className="product-box__category">
                                <h3>{props.category.name}</h3>
                                {
                                    props.category.comingSoon ? (
                                        <h3>Coming Soon</h3>
                                    ) : null
                                }
                            </div>
                            {
                                props.category.comingSoon ? (
                                    <img src="/comingSoon.jpg" alt={props.category.name} />
                                ) : <img src={props.category.image} alt={props.category.name} />
                            }
                        </div>
                    </Link>
                )
            }
        </div>
    );
}

export default ProductBox;