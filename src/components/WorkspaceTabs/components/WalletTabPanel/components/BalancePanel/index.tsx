import * as React from "react";
import * as copytoclipboard from "copy-to-clipboard";
const QRCode = require("qrcode");

const copy = require("./img/copy.svg");
const copyWhite = require("./img/copy-white.svg");
const psc = require("./img/psc.svg");

import "./style.scss";

const PropTypes = require("prop-types");

class BalancePanel extends React.Component<any> {
    qrcode: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.qrcode = React.createRef();
    }

    componentDidMount() {
        QRCode.toCanvas(
            this.qrcode.current,
            this.props.address,
            { errorCorrectionLevel: "M", version: 3 },
            function (err: Error) {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("success!");
                }
            });
    }

    handleCopy = () => {
        copytoclipboard(this.props.address);
    }

    render() {
        return (
            <div className="alice-balance-panel">
                    <canvas  className="alice-balance-panel_qr" ref={this.qrcode} />
                <div className="flex-column flex-one">
                    <div className="alice-balance-panel_balance">
                        <img src={psc} className="alice-balance-panel_balance-icon" />
                        <span>Balance: <strong>{this.props.balance} PSC</strong></span>
                    </div>
                    <div className="alice-balance-panel_address">
                        <span>Address: <strong className="white">{this.props.address}</strong></span>
                        <button className="alice-balance-panel_address-copy_button" onClick={this.handleCopy}>
                            <img src={copy} className="alice-balance-panel_address-copy_button_icon" />
                            <img src={copyWhite} className="alice-balance-panel_address-copy_button_icon-white" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default BalancePanel;