import * as React from "react";
import * as copytoclipboard from "copy-to-clipboard";
import BigNumber from "bignumber.js";
const QRCode = require("qrcode");
const PropTypes = require("prop-types");

const copy = require("./img/copy.svg");
const copyWhite = require("./img/copy-white.svg");

const icons = {
    ETH: require("./img/eth.svg"),
    PSC: require("./img/psc.svg")
};

const {
    SYMBOL
} = require("../../../../../../config");

import CopiedNotification from "./components/CopiedNotification";

import TooltipNotification from "../../../../../common/TooltipNotification";

import "./style.scss";

class CopyButton extends React.PureComponent<any> {
    state = {
        copied: false,
        hidden: false
    };

    timeout: NodeJS.Timer;

    handleCopy = () => {
        const {onClick} = this.props;

        if (typeof onClick === "function") {
            onClick();
        }

        this.setState(() => ({
            copied: true,
            hidden: false
        }), () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.setState(() => ({
                    hidden: true
                }));

                this.timeout = setTimeout(() => {
                    this.setState(() => ({
                        copied: false,
                        hidden: false
                    }));
                }, 1000);
            }, 3000);
        });
    }

    render() {
        return (
            <div className="alice-balance-panel_address-copy_button">
                            <button onClick={this.handleCopy}>
                                <img src={copy} className="alice-balance-panel_address-copy_button_icon" />
                                <img src={copyWhite} className="alice-balance-panel_address-copy_button_icon-white" />
                            </button>
                            {
                                this.state.copied && (
                                    <TooltipNotification hidden={this.state.hidden} text="Address copied to clipboard"/>
                                )
                            }
                        </div>
        );
    }
}

class BalancePanel extends React.Component<any> {

    static defaultProps = {
        balance: 0
    };

    qrcode: React.RefObject<any>;

    state = {
        copied: false
    };

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
    render() {
        const decimals = new BigNumber(10).pow(18); // ToDo: fetch value from token contract for plasma chain
        const balance = new BigNumber(this.props.balance).div(decimals).toPrecision(2);
        return (
            <div className="alice-balance-panel">
                <canvas className="alice-balance-panel_qr" ref={this.qrcode} />
                <div className="flex-column flex-one">
                    <div className="alice-balance-panel_balance">
                        <img src={icons[SYMBOL]} className="alice-balance-panel_balance-icon" />
                        <span>Balance: <strong>{balance} {SYMBOL}</strong></span>
                    </div>
                    <div className="alice-balance-panel_address">
                        <span className="alice-balance-panel_address-text">
                            Address: <strong className="white">{this.props.address}</strong>
                        </span>
                        <CopyButton onClick={copytoclipboard.bind(this, this.props.address)}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default BalancePanel;