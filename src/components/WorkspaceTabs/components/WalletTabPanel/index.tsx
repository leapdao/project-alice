import * as React from "react";
import BalancePanel from "./components/BalancePanel";
import { TransactionsPanel } from "./components/TransactionsPanel";
import InputPanel from "./components/InputPanel";
import getWeb3 from "../../../../getWeb3";
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

export default class WalletTabPanel extends React.Component<WalletTabPanelProps> {
    static defaultProps = {
        store: {}
    };

    handleSendTransaction = async (to: string, value: number) => {
        const web3 = getWeb3();
        const gasPrice = await web3.eth.getGasPrice();
        const nonce = await web3.eth.getTransactionCount(this.props.store.address, "pending");
        const tx = {
            to,
            value,
            gas: 21000,
            nonce,
            gasPrice,
        };
        const { rawTransaction } = await web3.eth.accounts.signTransaction(tx, this.props.store.privKey);
        const hash = await new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction(rawTransaction, (err, txHash) => {
                if (err) {
                    reject(err);
                } else {
                    this.props.store.add({
                        ...tx,
                        from: this.props.store.address,
                        hash: txHash,
                        status: false,
                    });
                    resolve(txHash);
                }
            });
        });

        return hash;
    }

    render() {
        const { store, stores } = this.props;
        return (
            <div className="alice-tab-panel">
                <BalancePanel balance={store.balance} address={store.address} />
                <InputPanel balance={store.balance} onSend={this.handleSendTransaction} address={store.address}/>
                <hr className="alice-panel-separ" />
                <TransactionsPanel
                    transactions={store.transactions}
                    lastBlock={store.fromBlock}
                    addresses={Object.keys(stores).reduce((o, key) => ({
                        ...o,
                        [stores[key].address.toLowerCase()]: key,
                    }), {})}
                    getLastTransactions={console.log.bind(console)}
                />
            </div>
        );
    }
}

export const createWalletTabPanel = (wallet) => (inject((store: any) => ({
    store: store[wallet],
    stores: store,
}))(observer(WalletTabPanel))) as any;