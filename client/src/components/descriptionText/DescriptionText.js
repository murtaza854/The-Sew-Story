import React from 'react';
import './DescriptionText.scss';

function DescriptionText(props) {
    return (
        <p className={`description-text ${props.className}`}>
            {props.text}
        </p>
    );
}

export default DescriptionText;