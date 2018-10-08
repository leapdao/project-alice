import * as React from "react";
import { observer, inject } from "mobx-react";
import { Tx, helpers, Output } from "parsec-lib";

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
import { TokensContext } from "../../../../contexts";
import { Contract } from "web3/types";

export default class WalletTabPanel extends React.Component<WalletTabPanelProps> {

    consolidateAddress = async () => {
        const { store } = this.props;
        const web3 = getWeb3();

        const unspent = await web3.getUnspent(store.address);

        if (unspent.length > 1 && store && (store as any).tcs[store.color]) {
            const contract = (store as any).tcs[store.color] as Contract;
            const balance = Number(await contract.methods.balanceOf(store.address).call());

            const inputs = helpers.calcInputs(unspent, store.address, balance, store.color);
            const output = new Output(balance, store.address, store.color);

            const tx = Tx.consolidate(inputs, output);
            web3.eth.sendSignedTransaction(tx.toRaw() as any);
        }
    }

    handleSendTransaction = async (to: string, value: number) => {
        const { store } = this.props;
        const web3 = getWeb3();
        const unspent = await web3.getUnspent(store.address);
        const inputs = helpers.calcInputs(unspent, store.address, value, store.color);
        const outputs = helpers.calcOutputs(unspent, inputs, store.address, to, value, store.color);
        const tx = Tx.transfer(inputs, outputs).signAll(store.privKey);

        const hash = await new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction(tx.toRaw() as any, (err, txHash) => {
                if (err) {
                    reject(err);
                } else {
                    store.add({
                        to,
                        value,
                        from: store.address,
                        hash: txHash,
                        status: false,
                        raw: tx.toRaw(),
                    });
                    resolve(txHash);
                }
            }).once("receipt", this.consolidateAddress);
        });

        return hash;
    }

    render() {
        const { store, stores } = this.props;

        return (
            <div className="alice-tab-panel">
                <BalancePanel balance={store.balance} address={store.address} balances={store.balances} />
                <TokensContext.Consumer>
                    {({ selected }: any) => (
                        <InputPanel
                            selectedToken={selected}
                            balance={store.balance}
                            onSend={this.handleSendTransaction}
                            address={store.address}
                        />
                    )}
                </TokensContext.Consumer>
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

export const createWalletTabPanel = (wallet: string) => (inject((store: any) => ({
    store: store[wallet],
    stores: store,
}))(observer(WalletTabPanel))) as any;