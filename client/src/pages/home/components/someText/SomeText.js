import React from 'react';
import './SomeText.scss';

function SomeText(props) {
    return (
        <div className={`some-text ${props.className}`}>
            <p className="some-text-1">{props.text1}</p>
            <p className="some-text-2">{props.text2}</p>
        </div>
    );
}

export default SomeText;