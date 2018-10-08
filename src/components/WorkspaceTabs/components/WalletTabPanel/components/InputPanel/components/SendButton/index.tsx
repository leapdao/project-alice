import * as React from "react";

import "./style.scss";

interface SendButtonProps {
    onClick: React.MouseEventHandler;
    disabled?: boolean;
}

const SendButton: React.SFC<SendButtonProps> = ({ onClick, disabled }) => (
    <button className="tx-send" onClick={onClick} disabled={disabled}>
        Send
    </button>
);

export default SendButton;