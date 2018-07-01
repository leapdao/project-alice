import * as React from "react";

import "./style.scss";

export default (props) => (
    <div className={`tx-cross-dash${props.animation ? " tx-cross-dash-with-animation" : ""}`}>
        <svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 20 20" enableBackground="new 0 0 20 20" space="preserve">
            <linearGradient id="tx-cross-1" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="20" y2="10">
                <stop offset="0" style={{"stopColor": "#ff0000"}} />
                <stop offset="1" style={{"stopColor": "#ff0000"}} />
            </linearGradient>
            <path className="tx-cross" fill="url(#tx-cross-1)" stroke="#ff0000" strokeWidth="3" strokeMiterlimit="10" d="M0,0c20,20,20,20,20,20" />
            <linearGradient id="tx-cross-2" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="20" y2="10">
                <stop offset="0" style={{"stopColor": "#ff0000"}} />
                <stop offset="1" style={{"stopColor": "#ff0000"}} />
            </linearGradient>
            <line className="tx-cross" fill="url(#tx-cross-2)" stroke="#ff0000" strokeWidth="3" strokeMiterlimit="10" x1="20" y1="0" x2="0" y2="20" />
        </svg>
    </div>
)