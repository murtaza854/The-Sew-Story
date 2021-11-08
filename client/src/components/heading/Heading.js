import React from 'react';
import './Heading.scss';

function Heading(props) {
    return (
        <h1 className={`heading ${props.className}`}>
            {props.text}
        </h1>
    );
}

export default Heading;