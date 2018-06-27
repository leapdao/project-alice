import { observable, action } from "mobx";
import { assign } from "lodash";
import { TransactionReceipt } from "web3/types";
import getWeb3 from "../getWeb3";

export default class Transaction {
    transactionHash: string;
    @observable status: string | boolean;
    @observable transactionIndex: number;
    @observable blockHash: string;
    @observable blockNumber: number;
    @observable from: string;
    @observable to: string;
    @observable contractAddress: string;
    @observable cumulativeGasUsed: number;
    @observable gasUsed: number;

    constructor(receipt: TransactionReceipt) {
        assign(this, receipt);
        this.loadReceipt(receipt.transactionHash);
    }

    @action
    update = (receipt) => {
        assign(this, receipt);
    }

    @action
    loadReceipt = (hash: string) => {
        const web3 = getWeb3();
        web3.eth.getTransactionReceipt(hash, (err, receipt) => {
            if (err) {
                console.error(err.message);
            } else if (receipt) {
                this.update({
                    status: receipt.status
                });
            }
        });
    }
}