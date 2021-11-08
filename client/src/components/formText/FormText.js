import React from 'react';
import { Link } from 'react-router-dom';
import './FormText.scss';

function FormText(props) {
    return (
        <p className={`form-text ${props.classes}`}>
            {props.text} <Link rel={props.rel} to={props.to}>{props.link}</Link>
        </p>
    );
}

export default FormText;