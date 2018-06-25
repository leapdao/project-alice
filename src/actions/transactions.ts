import { size, map } from "lodash";
import getWeb3 from "../getWeb3";
import { Transaction } from "web3/types";

export const TRANSACTIONS_GET_LAST_ONE = "TRANSACTIONS_GET_LAST_ONE";
export const TRANSACTIONS_GET_LAST_ONE_SUCCESS = "TRANSACTIONS_GET_LAST_ONE_SUCCESS";
export const TRANSACTIONS_GET_LAST_ONE_FAILED = "TRANSACTIONS_GET_LAST_ONE_FAILED";

export const TRANSACTIONS_GET_RECEIPT_SUCCESS = "TRANSACTIONS_GET_RECEIPT_SUCCESS";
export const TRANSACTIONS_GET_RECEIPT_FAILED = "TRANSACTIONS_GET_RECEIPT_FAILED";

const getTransactions = (lastBlock, address) => new Promise((resolve, reject) => {
    const transactionsOwnFilter = (transaction) => {
        return String(transaction.from).toLowerCase() === address.toLowerCase() ||
            String(transaction.to).toLowerCase() === address.toLowerCase();
    };
    const web3 = getWeb3();
    web3.eth.getBlock(lastBlock, true, (err, block) => {
        if (err) {
            reject(err);
        } else {
            if (block !== null && block.transactions !== null) {
                const transactions = block.transactions
                    .filter(transactionsOwnFilter);
                resolve(transactions);

            } else {
                reject();
            }
        }
    });
});

const getTransactionReceipt = (hash) => new Promise((resolve, reject) => {
    const web3 = getWeb3();
    web3.eth.getTransactionReceipt(hash, (err, receipt) => {
        if (err) {
            console.error(err.message);
            reject(err);
        } else {
            console.log(receipt);
            resolve(receipt);
        }
    });
});

export const getLastTransactions = (lastBlock, address) => (dispatch) => {
    getTransactions(lastBlock, address)
        .then(async (transactions) => {
            console.log(transactions);
            if (size(transactions) > 0) {
                dispatch({
                    type: TRANSACTIONS_GET_LAST_ONE_SUCCESS,
                    payload: {
                        data: {
                            transactions: transactions,
                            address
                        }
                    }
                });

                map(transactions, ({ hash }: Transaction) => getTransactionReceipt(hash));

                map(transactions, ({ hash }: Transaction) => getTransactionReceipt(hash).then(receipt => {
                    dispatch({
                        type: TRANSACTIONS_GET_RECEIPT_SUCCESS,
                        payload: {
                            data: {
                                receipt: receipt,
                                address
                            }
                        }
                    });
                }));
            }

            dispatch(getLastTransactions(++lastBlock, address));
        })
        .catch((err) => {
            if (err) {
                dispatch({
                    type: TRANSACTIONS_GET_LAST_ONE_FAILED,
                    payload: err
                });
            }

            dispatch(getLastTransactions(lastBlock, address));
        });
};