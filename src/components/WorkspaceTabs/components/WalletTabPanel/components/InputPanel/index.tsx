import * as React from 'react';
import Select, { OptionComponentProps, OptionValues } from 'react-select';

import SendButton from './components/SendButton';
import { InputPanelState, Receiver } from './types';

import TooltipNotification from '../../../../../common/TooltipNotification';
import { fromCents, toCents } from '../../../../../../utils';

const dropdown = require('./img/dropdown.svg');
const dropdownWhite = require('./img/dropdown-white.svg');

import {
  ALICE_PUBLIC_ADDRESS,
  BOB_PUBLIC_ADDRESS,
  CHARLIE_PUBLIC_ADDRESS,
} from './../../../../../../config';

const users = [
  {
    name: 'Alice',
    account: ALICE_PUBLIC_ADDRESS,
  },
  {
    name: 'Bob',
    account: BOB_PUBLIC_ADDRESS,
  },
  {
    name: 'Charlie',
    account: CHARLIE_PUBLIC_ADDRESS,
  },
];

const notificationStyle = {
  right: '-12em',
  width: '18em',
};

class Option extends React.PureComponent<OptionComponentProps<Receiver>> {
  handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onSelect) {
      this.props.onSelect(this.props.option, event);
    }
  };

  render() {
    const { option } = this.props;
    return (
      <div className="select-address-option" onMouseDown={this.handleMouseDown}>
        {option.name}
      </div>
    );
  }
}

class InputPanel extends React.PureComponent<any, InputPanelState> {
  state: InputPanelState = {
    receiver: null,
    sending: false,
    sent: false,
    hiddenNotification: false,
  };

  timeout: NodeJS.Timer;

  handleSelectAddress = (receiver: Receiver) => {
    this.setState({ receiver });
  };

  valueRenderer = (receiver: Receiver) => (
    <span>
      Send to address: <strong>{receiver.name}</strong>
    </span>
  );

  arrowRenderer = ({ isOpen }: { isOpen: boolean }) => (
    <img
      className={`alice-input-panel_address-dropdown${isOpen ? ' opened' : ''}`}
      src={isOpen ? dropdownWhite : dropdown}
    />
  );

  handleChangeAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    this.setState({
      amount: /^\d*\.?\d{0,18}$/.test(value)
        ? value
        : value === ''
          ? value
          : this.state.amount,
    });
  };

  handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { selectedToken } = this.props;
    const balance = fromCents(this.props.balance, selectedToken.decimals);
    this.setState(state => {
      const amount = Number(state.amount);
      if (isNaN(amount) || !amount || amount < 0) {
        return { amount: '' };
      }

      return {
        amount: String(Math.min(balance, amount)),
      };
    });
  };

  handleSetMaxAmount = () => {
    const { balance, selectedToken } = this.props;
    this.setState({
      amount: fromCents(balance, selectedToken.decimals),
    });
  };

  handleSendTransaction = async () => {
    const { amount, receiver } = this.state;
    const { balance, selectedToken } = this.props;
    if (amount && receiver) {
      this.setState({ sending: true });
      try {
        await this.props.onSend(
          receiver.account,
          Math.min(toCents(amount, selectedToken.decimals), balance)
        );

        this.setState(
          () => ({
            sent: true,
            hiddenNotification: false,
            notificationText: `${this.state.amount} ${
              selectedToken.symbol
            } successfully sent to ${receiver.name}`,
          }),
          () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              this.setState(() => ({
                hiddenNotification: true,
              }));

              this.timeout = setTimeout(() => {
                this.setState(() => ({
                  sent: false,
                  hiddenNotification: false,
                }));
              }, 1000);
            }, 3000);
          }
        );
      } finally {
        this.setState({ amount: undefined, receiver: null, sending: false });
      }
    }
  };

  render() {
    const { receiver } = this.state;
    return (
      <div className="alice-input-panel">
        <div className="alice-input-panel_address">
          <Select
            className="alice-input-panel_address-text"
            optionComponent={Option}
            options={users.filter(u => u.account !== this.props.address)}
            onChange={this.handleSelectAddress}
            placeholder="Select address"
            searchable={false}
            multi={false}
            value={receiver as any}
            valueRenderer={this.valueRenderer}
            valueKey="account"
            labelKey="name"
            clearable={false}
            arrowRenderer={this.arrowRenderer}
          />
        </div>

        <label className="alice-input-panel_amount-wrapper">
          <input
            className="alice-input-panel_amount"
            type="text"
            placeholder="Send amount"
            value={this.state.amount || ''}
            onChange={this.handleChangeAmount}
            onBlur={this.handleBlur}
          />
          <button
            className="alice-input-panel_amount-max"
            onClick={this.handleSetMaxAmount}
          >
            Max
          </button>
        </label>

        <SendButton
          disabled={this.state.sending}
          onClick={this.handleSendTransaction}
        />
        {this.state.sent && (
          <TooltipNotification
            hidden={this.state.hiddenNotification}
            text={this.state.notificationText}
            style={notificationStyle}
          />
        )}
      </div>
    );
  }
}

export default InputPanel;
