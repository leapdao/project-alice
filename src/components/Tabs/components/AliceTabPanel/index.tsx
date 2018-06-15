import * as React from 'react';
import { TransactionReceipt } from 'web3/types';

import BalancePanel from './components/BalancePanel';
import TransactionsPanel from './components/TransactionsPanel';
import InputPanel from './components/InputPanel';
import './style.scss';

const AliceTabPanel = () => {
    const transactions = [{
        'hash': '1',
        'nonce': 2,
        'blockHash': '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
        'blockNumber': 3,
        'transactionIndex': 0,
        'from': '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
        'to': '0x6295ee1b4f6dd65047762f924ecd367c17eabf8f',
        'value': '123450000000000000',
        'gas': 314159,
        'gasPrice': '2000000000000',
        'input': '0x57cb2fc4'
    }, {
        'hash': '2',
        'nonce': 2,
        'blockHash': '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
        'blockNumber': 3,
        'transactionIndex': 0,
        'from': '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
        'to': '0x6295ee1b4f6dd65047762f924ecd367c17eabf8f',
        'value': '123450000000000000',
        'gas': 314159,
        'gasPrice': '2000000000000',
        'input': '0x57cb2fc4'
    }, {
        'hash': '0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836s',
        'nonce': 2,
        'blockHash': '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
        'blockNumber': 3,
        'transactionIndex': 0,
        'from': '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
        'to': '0x6295ee1b4f6dd65047762f924ecd367c17eabf8f',
        'value': '123450000000000000',
        'gas': 314159,
        'gasPrice': '2000000000000',
        'input': '0x57cb2fc4'
    }];
    return (
        <div className="alice-tab-panel">
            <BalancePanel />
            <InputPanel balance={200}/>
            <hr className="alice-panel-separ"/>
            <TransactionsPanel 
                transactions={transactions}
            />
        </div>
    );
};

export default AliceTabPanel;