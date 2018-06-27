import { observable, action, toJS, reaction } from "mobx";
import TransactionModel from "./Transaction";
import getWeb3 from "../getWeb3";
import { size, findIndex, map, assign } from "lodash";
import BigNumber from "bignumber.js";
import { Transaction, TransactionReceipt } from "web3/types";
import { GENESIS_BLOCK } from "../config";

const range = (from: number, to: number) => Array.from(new Array(to - from), (_, i) => i + from);

const txOwnFilter = (address: string) => (transaction: Transaction) => {
    return String(transaction.from).toLowerCase() === address.toLowerCase() ||
        String(transaction.to).toLowerCase() === address.toLowerCase();
};

const getTransactions = async (address: string, fromBlock: number, toBlock: number) => {
    if (fromBlock === toBlock) {
        return [];
    }

    const web3 = getWeb3();
    const blocks = await Promise.all(range(fromBlock, toBlock + 1)
        .map(i => web3.eth.getBlock(i, true)));

    const transactions = (
        blocks
            .filter(b => b && b.transactions)
            .reduce((txs, block) => txs.concat(block.transactions.filter(txOwnFilter(address))), [])
    );
    return transactions;
};

const getBalance = (address: string): Promise<BigNumber> => new Promise((resolve, reject) => {
    const web3 = getWeb3();
    web3.eth.getBalance(address, (err: Error, balance: BigNumber) => {
        if (err) {
            reject(err);
        } else {
            resolve(balance);
        }
    });
});

class Store {
    @observable transactions = [];
    @observable fromBlock: number;
    @observable notifications: number = 0;
    @observable address: string;
    @observable privKey: string;
    @observable balance: number;

    // ToDo: pass privKey only. Address can be derrived from private key
    constructor(address: string, privKey: string) {
        this.address = address;
        this.privKey = privKey;

        try {
            let initialStore;
            const store = localStorage.getItem(`psc_store_${this.address.substr(2, 6)}`);

            if (store) {
                initialStore = JSON.parse(store);
            } else {
                initialStore = {
                    fromBlock: GENESIS_BLOCK,
                    balance: 0
                };
            }

            if (initialStore) {
                assign(this, {
                    fromBlock: initialStore.fromBlock,
                    balance: initialStore.balance
                });

                if (initialStore.transactions) {
                    assign(this, {
                        transactions: initialStore.transactions.map((transaction: TransactionReceipt) => {
                            return new TransactionModel(transaction);
                        })
                    });
                }
            }

            this.getBalance(address);

            this.load(address, this.fromBlock);

        } catch (error) {
            console.error(error.message);
        }
    }

    @action
    add = (transaction: any) => {
        const index = findIndex(this.transactions, ({transactionHash}: any) => {
            return transactionHash === transaction.hash;
        });

        if (index === -1) {
            const tx = new TransactionModel(assign({}, transaction, {
                transactionHash: transaction.hash
            }));
            this.transactions.push(tx);
        } else {
            this.transactions[index].update(transaction);
        }

        this.notifications = this.notifications + 1;
        this.save();
    };

    @action
    getBalance = async (address) => {
        try {
            const balance = await getBalance(address);
            assign(this, {balance: new BigNumber(balance).toNumber()});

        } catch (err) {
            console.error(err.message);
        }
    };

    @action
    load = async (address: string, fromBlock: number = GENESIS_BLOCK) => {
        const web3 = getWeb3();
        // start from 0 for plasma chain
        // start from blockNumber - n for ethereum
        const blockNumber = await web3.eth.getBlockNumber();

        try {
            const transactions = await getTransactions(address, fromBlock, blockNumber);

            if (size(transactions) > 0) {
                map(transactions, this.add.bind(this));
                this.getBalance(address);
            }
            this.fromBlock = blockNumber;

            this.save();

            setTimeout(() => {
                this.load(address, this.fromBlock);
            }, 5000);
        } catch (error) {
            console.error(error.message);
            setTimeout(() => {
                this.load(address, fromBlock);
            }, 5000);
        }
    };

    save = () => {
        localStorage.setItem(`psc_store_${this.address.substr(2, 6)}`, JSON.stringify({
            transactions: toJS(this.transactions),
            fromBlock: this.fromBlock,
            balance: this.balance
        }));
    };
}

export default Store;