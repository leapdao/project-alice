import * as React from "react";
import { observer } from "mobx-react";
import { sortBy } from "lodash";

const ReactPaginate = require("react-paginate");

import Pending from "./components/Pending";
import Checkmark from "./components/Checkmark";

import "./style.scss";
import BigNumber from "bignumber.js";
import Cross from "./components/Cross";
import { PROVIDER_ETHERSCAN_BASE, TRANSACTIONS_PAGE_SIZE } from "../../../../../../config";

const getStatus = (original) => {

    switch (original.status) {
        case true:
        case "0x1":
            return "success";
        case "0x0":
            return "failed";
        default:
            return original.blockNumber ? "success" : "pending";
    }
};

@observer
class TxStatus extends React.Component<any> {
    state = {
        animation: false
    };

    constructor(props: any) {
        super(props);

        this.state.animation = this.props.tx.status ? false : true;
    }

    render() {
        if (this.props.tx.blockNumber) {
            return <Checkmark animation={this.state.animation}/>;
        }
        switch (getStatus(this.props.tx)) {
            case "success":
                return <Checkmark animation={this.state.animation}/>;
            case "failed":
                return <Cross animation={this.state.animation}/>;
            default:
                return <Pending/>;
        }
    }
}

const decimals = new BigNumber(10).pow(18); // ToDo: fetch value from token contract for plasma chain

const names = {
    alice: "Alice",
    bob: "Bob",
    charlie: "Charlie",
};

const getName = (addresses, address) => {
    const id = addresses[address.toLowerCase()];
    if (id) {
        return names[id];
    }

    return address;
};

const TxTr = observer(({tx, addresses}) => {
    return (
        <tr className={`tx-tr ${getStatus(tx)}`}>
            <td className="tx-td tx-td_hash">
                <a
                    className="alice-transactions-list_item-hash"
                    href={`${PROVIDER_ETHERSCAN_BASE}/tx/${tx.transactionHash}`}
                    target="_blank"
                >
                    {tx.transactionHash.substr(2, 6)}
                </a>
            </td>
            <td className="tx-td tx-td_from">
                <a
                    className="alice-transactions-list_item-from"
                    href={`${PROVIDER_ETHERSCAN_BASE}/address/${tx.from}`}
                    target="_blank"
                >
                    {getName(addresses, tx.from)}
                </a>
            </td>
            <td className="tx-td tx-td_to">
                <a
                    className="alice-transactions-list_item-to"
                    href={`${PROVIDER_ETHERSCAN_BASE}/address/${tx.to}`}
                    target="_blank"
                >
                    {getName(addresses, tx.to)}
                </a>
            </td>
            <td className="tx-td">{new BigNumber(tx.value).div(decimals).toNumber()}</td>
            <td className="tx-td">{tx.gas}</td>
            <td className="tx-td">{tx.gasPrice && new BigNumber(tx.gasPrice).div(decimals).toNumber()}</td>
            <td className="tx-td">{tx.gasPrice && new BigNumber(tx.gasPrice).times(tx.gas).div(decimals).toNumber()}</td>
            <td className="tx-td"><TxStatus tx={tx}/></td>
        </tr>
    );
});

@observer
class TransactionsPanel extends React.Component {
    state = {
        page: 0
    };

    handlePageChange = (page) => {
        this.setState((state) => ({
            page: page.selected
        }));
    }

    render() {
        const {transactions, addresses} = this.props;
        const {page} = this.state;
        const pageCount = Math.ceil(transactions.length / TRANSACTIONS_PAGE_SIZE);
        return (
            <div className="alice-transactions-panel">
                <h4 className="alice-transactions-panel_header">Tx History:</h4>
                <table className="tx-table">
                    <thead className="tx-thead">
                    <tr className="tx-tr">
                        <th className="tx-th">TX HASH</th>
                        <th className="tx-th">FROM</th>
                        <th className="tx-th">TO</th>
                        <th className="tx-th">VALUE</th>
                        <th className="tx-th">GAS</th>
                        <th className="tx-th">GAS PRICE</th>
                        <th className="tx-th">TX FEE</th>
                        <th className="tx-th"/>
                    </tr>
                    </thead>
                    <tbody className="tx-tbody">
                    {
                        sortBy(transactions, [(tx) => getStatus(tx) !== "pending", (tx) => -tx.blockNumber])
                            .slice(page * TRANSACTIONS_PAGE_SIZE, page * TRANSACTIONS_PAGE_SIZE + TRANSACTIONS_PAGE_SIZE)
                            .map((tx) => (
                                <TxTr tx={tx} key={tx.transactionHash} addresses={addresses}/>
                            ))
                    }
                    </tbody>
                </table>
                {
                    transactions.length > TRANSACTIONS_PAGE_SIZE && (
                        <ReactPaginate
                            nextLabel={">"}
                            previousLabel={"<"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            containerClassName={"tx-pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            onPageChange={this.handlePageChange}
                        />
                    )
                }
            </div>
        );
    }
}

export default TransactionsPanel;