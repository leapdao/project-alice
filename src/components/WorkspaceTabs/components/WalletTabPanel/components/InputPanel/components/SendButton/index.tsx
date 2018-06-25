import * as React from "react";

import "./style.scss";

export default ({onClick}) => (
    <button className="tx-send" onClick={onClick}>Send</button>
);