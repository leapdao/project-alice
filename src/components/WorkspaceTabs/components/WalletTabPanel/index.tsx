import * as React from "react";
import { observer, inject } from "mobx-react";
import { helpers } from "parsec-lib";

import {
    ALICE_PUBLIC_ADDRESS,
    ALICE_PRIVATE_KEY,
    BOB_PUBLIC_ADDRESS,
    BOB_PRIVATE_KEY,
    CHARLIE_PUBLIC_ADDRESS,
    CHARLIE_PRIVATE_KEY
} from "./../../../../config";
import getWeb3 from "../../../../getWeb3";

import "./style.scss";
import { WalletTabPanelProps } from "./types";
import BalancePanel from "./components/BalancePanel";
import TransactionsPanel from "./components/TransactionsPanel";
import InputPanel from "./components/InputPanel";

export default class WalletTabPanel extends React.Component<WalletTabPanelProps> {
    static defaultProps = {
        store: {}
    };

    handleSendTransaction = async (to: string, value: number) => {
        const { store } = this.props;
        const web3 = getWeb3(false);
        const unspent = await web3.getUnspent(store.address);
        const height = await web3.eth.getBlockNumber();
        const tx = helpers.makeTransferTxFromUnspent(unspent, store.address, to, value, store.privKey, height);

        const hash = await new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction(tx.toRaw(), (err, txHash) => {
                if (err) {
                    reject(err);
                } else {
                    store.add({
                        to,
                        value,
                        from: store.address,
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
                    loading={store.loading}
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