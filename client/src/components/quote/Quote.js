import React from 'react';
import './Quote.scss';

function Quote(props) {
    return (
        <p className={`quote ${props.className}`}>
            {props.firstLineNormal} <span>{props.firstLineCursive}</span>
            <br />
            {props.secondLineNormal} <span>{props.secondLineCursive}</span>
        </p>
    );
}

export default Quote;