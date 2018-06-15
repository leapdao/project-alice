import * as React from 'react';
import ReactTable from 'react-table';
import { TransactionReceipt, Transaction } from 'web3/types';

import Pending from './components/Pending';
import Checkmark from './components/Checkmark';

import './style.scss';

const getStatus = (original) => {
  switch (original.hash) {
    case '1':
      return 'success';
    case '2':
      return 'pending';
    default: 
      return undefined;
  }
};

const columns = [{
    Header: 'FROM',
    accessor: 'from',
    Cell: props => <a className="alice-transactions-list_item-from" href={`#${props.value}`}>{props.value}</a>,
    className: 'alice-transactions-table_header-from'
  }, {
    Header: 'TO',
    accessor: 'to',
    Cell: props => <a className="alice-transactions-list_item-to" href={`#${props.value}`}>{props.value}</a>,
    className: 'alice-transactions-table_header-to'
  }, {
    Header: 'VALUE',
    accessor: 'value'
  }, {
    Header: 'GAS',
    accessor: 'gas'
  }, {
    Header: 'GAS PRICE',
    accessor: 'gasPrice'
  }, {
    Header: 'TX FEE',
    accessor: 'txFee'
  }, {
    Cell: props => {
      const status = getStatus(props.original);
      switch (status) {
        case 'success':
          return <Checkmark/>;
        case 'pending':
          return <Pending/>;
        default: return null;
      }
    },
  }];

const TransactionsPanel = (props: PropTypes) => (
    <div className="alice-transactions-panel">
        <h4 className="alice-transactions-panel_header">Tx History:</h4>
        <ReactTable
            className="alice-transactions-panel-table"
            getTrGroupProps={(state, rowInfo, column, instance) => {
              const className = getStatus(rowInfo.original);
              return {className};
            }}
            columns={columns}
            data={props.transactions}
            indexKey="hash"
            noDataText="There are no matching entries"
            showPagination={props.transactions.length > 10}
            showPageSizeOptions={false}
            defaultPageSize={10}
            minRows={1}
        />
    </div>
);

type PropTypes = {
    transactions: Array<Transaction>
};

export default TransactionsPanel;