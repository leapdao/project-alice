import * as React from "react";
import * as copytoclipboard from "copy-to-clipboard";
import BigNumber from "bignumber.js";
const QRCode = require("qrcode");

import "./style.scss";
import {
    ALICE_PUBLIC_ADDRESS,
    BOB_PUBLIC_ADDRESS,
    CHARLIE_PUBLIC_ADDRESS
} from "../../../../../../config";

const copy = require("./img/copy.svg");
const copyWhite = require("./img/copy-white.svg");

import SelectToken from "./components/SelectToken";

import TooltipNotification from "../../../../../common/TooltipNotification";

import { TokensContext } from "../../../../../../contexts";

import "./style.scss";
import { Token } from "../../types";

class CopyButton extends React.PureComponent<any> {
    state = {
        copied: false,
        hidden: false
    };

    timeout: NodeJS.Timer;

    handleCopy = () => {
        const { onClick } = this.props;

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
                        <TooltipNotification hidden={this.state.hidden} text="Address copied to clipboard" />
                    )
                }
            </div>
        );
    }
}

const addresses = {
    [ALICE_PUBLIC_ADDRESS]: 0,
    [BOB_PUBLIC_ADDRESS]: 1,
    [CHARLIE_PUBLIC_ADDRESS]: 2
};

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

    filterBalance = (token): any => ({
        ...token,
        balance: token.balances[addresses[this.props.address]]
    })

    render() {
        return (
            <div className="alice-balance-panel">
                <canvas className="alice-balance-panel_qr" ref={this.qrcode} />
                <div className="flex-column flex-one">
                    <TokensContext.Consumer>
                        {({ selected, tokens, changeToken }: any) => (
                            <SelectToken
                                balance={this.props.balance}
                                tokens={tokens.map(this.filterBalance)}
                                onChange={changeToken}
                                selected={this.filterBalance(selected)}
                            />
                        )}
                    </TokensContext.Consumer>
                    <div className="alice-balance-panel_address">
                        <span className="alice-balance-panel_address-text">
                            Address: <strong className="white">{this.props.address}</strong>
                        </span>
                        <CopyButton onClick={copytoclipboard.bind(this, this.props.address)} />
                    </div>
                </div>
            </div>
        );
    }
}
export default BalancePanel;