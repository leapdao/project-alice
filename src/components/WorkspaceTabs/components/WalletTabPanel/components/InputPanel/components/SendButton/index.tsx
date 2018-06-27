import * as React from "react";

import "./style.scss";

export default ({ onClick, disabled }) => (
    <button className="tx-send" onClick={onClick} disabled={disabled}>
        Send
    </button>
);