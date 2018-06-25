import { observable, action, toJS } from "mobx";
import Transaction from "./Transaction";
import { Web3Window } from "../../types";
import { size, findIndex, map, assign } from "lodash";
import BigNumber from "bignumber.js";

const { web3 } = window as Web3Window;

const getTransactions = (address: string, lastBlock: number = 0) => new Promise((resolve, reject) => {
    const transactionsOwnFilter = (transaction) => {
        return String(transaction.from).toLowerCase() === address.toLowerCase() ||
            String(transaction.to).toLowerCase() === address.toLowerCase();
    };

    web3.eth.getBlock(lastBlock, true, (err, block) => {
        if (err) {
            reject(err);
        } else {
            if (block !== null && block.transactions !== null) {
                const transactions = block.transactions
                    .filter(transactionsOwnFilter);
                    resolve(transactions);
            } else {
                reject(new Error("Block is null"));
            }
        }
    });
});

const getBalance = (address): Promise<BigNumber> => new Promise((resolve, reject) => {
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
    @observable lastBlock: number;
    @observable address: string;
    @observable balance: number;

    constructor(address: string) {
        this.address = address;

        try {
            const initialStore = JSON.parse(localStorage.getItem(`psc_store_${this.address.substr(2, 6)}`));

            if (initialStore) {
                assign(this, {
                    lastBlock: initialStore.lastBlock,
                    balance: initialStore.balance
            });
                
                if (initialStore.transactions) {
                    assign(this, {
                        transactions: initialStore.transactions.map((transaction) => {
                            return new Transaction(transaction);
                        })
                    });
                }
            }

            this.getBalance(address);

            this.load(address, this.lastBlock);

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
            this.transactions.push(new Transaction(assign({}, transaction, {
                transactionHash: transaction.hash
            })));
        } else {
            this.transactions[index].update(transaction);
        }

        this.save();
    }

    @action
    getBalance = async (address) => {
        try {
            const balance = await getBalance(address);
            assign(this, {balance: new BigNumber(balance).toNumber()});

        } catch (err) {
            console.error(err.message);
        }
    }

    @action
    load = async (address: string, lastBlock: number = 0) => {
        try {

            if (typeof lastBlock === "undefined") {
                lastBlock = 0;
            }
            const transactions = await getTransactions(address, lastBlock);
                
            if (size(transactions) > 0) {
                map(transactions, this.add.bind(this));
            }
            lastBlock++;
            this.lastBlock = lastBlock;

            this.load(address, lastBlock);
        } catch (error) {
            setTimeout(() => {
                this.load(address, lastBlock);
            }, 5000);
        }
    }

    save = () => {
        localStorage.setItem(`psc_store_${this.address.substr(2, 6)}`, JSON.stringify({
            transactions: toJS(this.transactions),
            lastBlock: this.lastBlock,
            balance: this.balance
        }));
    }
}

export default Store;