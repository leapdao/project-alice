import * as React from "react";
import BalancePanel from "./components/BalancePanel";
import { TransactionsPanel } from "./components/TransactionsPanel";
import InputPanel from "./components/InputPanel";
import * as Web3 from "web3";
import {
    ALICE_PUBLIC_ADDRESS,
    ALICE_PRIVATE_KEY,
    BOB_PUBLIC_ADDRESS,
    BOB_PRIVATE_KEY,
    CHARLIE_PUBLIC_ADDRESS,
    CHARLIE_PRIVATE_KEY
} from "./../../../../config";

const keys = {
    "alice": ALICE_PRIVATE_KEY,
    "bob": BOB_PRIVATE_KEY,
    "charlie": CHARLIE_PRIVATE_KEY
};

const addresses = {
    "alice": ALICE_PUBLIC_ADDRESS,
    "bob": BOB_PUBLIC_ADDRESS,
    "charlie": CHARLIE_PUBLIC_ADDRESS
};

const PropTypes = require("prop-types");

import "./style.scss";
import { observer, inject } from "mobx-react";
import { WalletTabPanelProps } from "./types";

const web3 = new (Web3 as any)("https://rinkeby.infura.io");

export default class WalletTabPanel extends React.Component<any> {
    static defaultProps = {
        store: {}
    };

    handleSendTransaction = (to: string, value: number) => {
        web3.eth.accounts.signTransaction({
            to,
            value,
            gas: 21000,
        }, this.props.store.privKey, (err, { rawTransaction }) => {
            web3.eth.sendSignedTransaction(rawTransaction, (err2, txHash) => {
                console.log(err2, txHash);
            });
        });
    }

    render() {
        const { store } = (this.props as WalletTabPanelProps);
        return (
            <div className="alice-tab-panel">
                <BalancePanel balance={store.balance} address={store.address} />
                <InputPanel balance={store.balance} onSend={this.handleSendTransaction} address={store.address}/>
                <hr className="alice-panel-separ" />
                <TransactionsPanel
                    transactions={store.transactions}
                    lastBlock={store.lastBlock}
                    getLastTransactions={console.log}
                />
            </div>
        );
    }
}

export const createWalletTabPanel = (wallet) => inject((store: any) => ({
    store: store[wallet]
}))(observer(WalletTabPanel));