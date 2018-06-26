import * as React from "react";
import ReactTable from "react-table";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import Pending from "./components/Pending";
import Checkmark from "./components/Checkmark";

import "./style.scss";
import BigNumber from "bignumber.js";
import { stat } from "fs";
import Cross from "./components/Cross";

const getStatus = (original) => {
  if (original.blockNumber) {
    return "success";
  }

  switch (original.status) {
    case true:
    case "0x1":
      return "success";
    case "0x0":
      return "failed";
    default:
      return "pending";
  }
};
const txOrderBy = ({ createdAt }) => new Date(createdAt).getTime();

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
    switch (this.props.tx.status) {
      case true:
      case "0x01":
        return <Checkmark animation={this.state.animation}/>;
      case "0x00":
        return <Cross animation={this.state.animation}/>;
      default:
        return <Pending />;
    }
  }
}

const getStatusClassName = (tx) => {
  if (tx.blockNumber) {
    return "success";
  }
  switch (tx.status) {
    case "0x01": case true: return "success";
    case "0x00": return "failed";
    default: return "pending";
  }
};

const decimals = new BigNumber(10).pow(18); // ToDo: fetch value from token contract for plasma chain

const TxTr = observer(({tx}) => {
  return (
    <tr className={`tx-tr ${getStatusClassName(tx)}`}>
      <td className="tx-td tx-td_from">
        <a className="alice-transactions-list_item-from" href={`#${tx.from}`} target="_blank">{tx.from}</a>
      </td>
      <td className="tx-td tx-td_to">
        <a className="alice-transactions-list_item-to" href={`#${tx.to}`} target="_blank">{tx.to}</a>
      </td>
      <td className="tx-td">{new BigNumber(tx.value).div(decimals).toNumber()}</td>
      <td className="tx-td">{tx.gas}</td>
      <td className="tx-td">{tx.gasPrice && new BigNumber(tx.gasPrice).div(decimals).toNumber()}</td>
      <td className="tx-td">{tx.gasPrice && new BigNumber(tx.gasPrice).times(tx.gas).div(decimals).toNumber()}</td>
      <td className="tx-td"><TxStatus tx={tx} /></td>
    </tr>
  );
});

export const TransactionsPanel = observer((props: any) => (
  <div className="alice-transactions-panel">
    <h4 className="alice-transactions-panel_header">Tx History:</h4>
    <table className="tx-table">
      <thead className="tx-thead">
        <tr className="tx-tr">
          <th className="tx-th">FROM</th>
          <th className="tx-th">TO</th>
          <th className="tx-th">VALUE</th>
          <th className="tx-th">GAS</th>
          <th className="tx-th">GAS PRICE</th>
          <th className="tx-th">TX FEE</th>
          <th className="tx-th" />
        </tr>
      </thead>
      <tbody className="tx-tbody">
        {props.transactions
          .filter(tx => getStatus(tx) === "pending")
          .map((tx) => (
            <TxTr tx={tx} key={tx.transactionHash}/>
          ))
        }
        {props.transactions
          .filter(tx => getStatus(tx) !== "pending")
          .sort((a, b) => b.blockNumber - a.blockNumber)
          .map((tx) => (
            <TxTr tx={tx} key={tx.transactionHash}/>
          ))
        }
      </tbody>
    </table>
  </div>
));