import * as React from 'react';

const copy = require('./img/copy.svg');
const copyWhite = require('./img/copy-white.svg');
const psc = require('./img/psc.svg');

import './style.scss';

const BalancePanel = () => (
    <div className="alice-balance-panel">
            <div className="alice-balance-panel_qr">
                <img src="/img/qr.png" width="125" height="125"/>
            </div>
            <div className="flex-column flex-one">
                <div className="alice-balance-panel_balance">
                    <img src={psc} className="alice-balance-panel_balance-icon"/>
                    <span>Balance: <strong>200,000 PSC</strong></span>
                </div>
                <div className="alice-balance-panel_address">
                    <span>Address: <strong className="white">0xc04ae254a1655c730cb9b9171e0def3d2c52e3b5</strong></span>
                    <button className="alice-balance-panel_address-copy_button">
                        <img src={copy} className="alice-balance-panel_address-copy_button_icon"/>
                        <img src={copyWhite} className="alice-balance-panel_address-copy_button_icon-white"/>
                    </button>
                </div>
            </div>
        </div>
);

export default BalancePanel;