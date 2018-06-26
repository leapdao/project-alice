import * as React from "react";
import * as copytoclipboard from "copy-to-clipboard";
import BigNumber from "bignumber.js";
const QRCode = require("qrcode");

const copy = require("./img/copy.svg");
const copyWhite = require("./img/copy-white.svg");
const psc = require("./img/psc.svg");

import "./style.scss";

const PropTypes = require("prop-types");

class BalancePanel extends React.Component<any> {

    static defaultProps = {
        balance: 0
    };

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
                }
            });
    }

    handleCopy = () => {
        copytoclipboard(this.props.address);
    }

    render() {
        const decimals = new BigNumber(10).pow(18); // ToDo: fetch value from token contract for plasma chain
        const balance =  new BigNumber(this.props.balance).div(decimals).toPrecision(2);
        const symbol = "ETH"; // ToDo: fetch value from token contract for plasma chain
        return (
            <div className="alice-balance-panel">
                    <canvas  className="alice-balance-panel_qr" ref={this.qrcode} />
                <div className="flex-column flex-one">
                    <div className="alice-balance-panel_balance">
                        <img src={psc} className="alice-balance-panel_balance-icon" />
                        <span>Balance: <strong>{balance} {symbol}</strong></span>
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