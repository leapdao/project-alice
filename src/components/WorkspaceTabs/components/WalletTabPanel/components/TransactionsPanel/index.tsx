import * as React from "react";
import { observer } from "mobx-react";
import { sortBy } from "lodash";
import { Tx } from "parsec-lib";
import BigNumber from "bignumber.js";

import "./style.scss";

const ReactPaginate = require("react-paginate");

import Pending from "./../../../../../common/Pending";
import Checkmark from "./../../../../../common/Checkmark";
import Cross from "./../../../../../common/Cross";
import { TokensContext } from "../../../../../../contexts";

import { decimals } from "../../../../../../config";

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
            return <Checkmark animation={this.state.animation} />;
        }
        switch (getStatus(this.props.tx)) {
            case "success":
                return <Checkmark animation={this.state.animation} />;
            case "failed":
                return <Cross animation={this.state.animation} />;
            default:
                return <Pending />;
        }
    }
}

const names = {
    alice: "Alice",
    bob: "Bob",
    charlie: "Charlie",
};

const EmptyTr = () => (
    <tr className="tx-tr">
        <td className="tx-td tx-td-empty">There are no matching entries</td>
    </tr>
);

const PendingTr = () => (
    <tr className="tx-tr">
        <td className="tx-td tx-td-pending">
            <Pending />
        </td>
    </tr>
);

const getName = (addresses, address) => {
    const id = addresses[address.toLowerCase()];
    if (id) {
        return names[id];
    }

    return address;
};

const getFee = (tx) => tx.gasPrice && new BigNumber(tx.gasPrice).times(tx.gas).div(decimals).toNumber() || null;
const getGasPrice = (tx) => tx.gasPrice && new BigNumber(tx.gasPrice).div(decimals).toNumber() || null;

const TxTr = observer(({ tx, addresses }) => {
    return (
        <TokensContext.Consumer>
            {({ tokens }: any) => {
                const txObject = Tx.fromRaw(tx.raw);
                const color = txObject.outputs[0].color;
                const token = tokens[color];
                return (
                    <tr className={`tx-tr ${getStatus(tx)}`}>
                        <td className="tx-td tx-td_hash">

                            {tx.transactionHash.substr(2, 6)}
                        </td>
                        <td className="tx-td tx-td_from">
                           {getName(addresses, tx.from)}
                        </td>
                        <td className="tx-td tx-td_to">
                            {getName(addresses, tx.to)}
                        </td>
                        <td className="tx-td">
                            {new BigNumber(tx.value).div(10 ** token.decimals).toNumber()}
                            {" "}
                            {token.symbol}
                        </td>
                        <td className="tx-td">{getFee(tx)}</td>
                        <td className="tx-td"><TxStatus tx={tx} /></td>
                    </tr>
                );
            }}
        </TokensContext.Consumer>
    );
});

@observer
class TransactionsPanel extends React.Component<any> {
    state = {
        page: 0
    };

    handlePageChange = (page) => {
        this.setState((state) => ({
            page: page.selected
        }));
    }

    render() {
        const { transactions, addresses, loading } = this.props;
        const { page } = this.state;
        const pageCount = Math.ceil(transactions.length / TRANSACTIONS_PAGE_SIZE);
        return (
            <div className="alice-transactions-panel">
                <h4 className="alice-transactions-panel_header">Transactions History:</h4>
                <table className="tx-table">
                    <thead className="tx-thead">
                        <tr className="tx-tr">
                            <th className="tx-th">#</th>
                            <th className="tx-th">FROM</th>
                            <th className="tx-th">TO</th>
                            <th className="tx-th">VALUE</th>
                            <th className="tx-th">FEE</th>
                            <th className="tx-th" />
                        </tr>
                    </thead>
                    <tbody className="tx-tbody">
                        {
                            transactions.length > 0 ?
                                sortBy(transactions, [(tx) => getStatus(tx) !== "pending", (tx) => -tx.blockNumber])
                                    .slice(
                                        page * TRANSACTIONS_PAGE_SIZE,
                                        page * TRANSACTIONS_PAGE_SIZE + TRANSACTIONS_PAGE_SIZE
                                    )
                                    .map((tx) => (
                                        <TxTr tx={tx} key={tx.transactionHash} addresses={addresses} />
                                    )) : loading ? (
                                        <PendingTr />
                                    ) : (
                                        <EmptyTr />
                                    )
                        }
                    </tbody>
                </table>
                {
                    transactions.length > TRANSACTIONS_PAGE_SIZE && (
                        <ReactPaginate
                            nextLabel={"❯"}
                            previousLabel={"❮"}
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