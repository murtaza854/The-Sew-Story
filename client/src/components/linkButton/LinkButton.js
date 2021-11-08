import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';

function LinkButton(props) {
    return (
        <>
            {
                props.onClick ? (
                    <Link onClick={e => props.onClick(e, props.id)} className={`link-button ${props.className}`} to={props.to}>{props.text}</Link>
                ) : (
                    <Link className={`link-button ${props.className}`} to={props.to}>{props.text}</Link>
                )
            }
        </>
    );
}

export default LinkButton;