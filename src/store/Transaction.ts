import { observable, action } from "mobx";
import { assign } from "lodash";
import { TransactionReceipt } from "web3/types";
import { Web3Window } from "../../types";

const { web3 } = window as Web3Window;

export default class Transaction {
    transactionHash: string;
    @observable status: string;
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
        web3.eth.getTransactionReceipt(hash, (err, receipt) => {
            if (err) {
                console.error(err.message);
            } else {
                this.update({
                    status: receipt.status
                });
            }
        });
    }
}