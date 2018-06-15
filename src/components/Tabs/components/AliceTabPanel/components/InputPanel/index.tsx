import * as React from 'react';
import Select from 'react-select';

import SendButton from './components/SendButton';
import { InputPanelProps, SelectAddressOption, InputPanelState } from './types';

const dropdown = require('./img/dropdown.svg');
const dropdownWhite = require('./img/dropdown-white.svg');

const users = [{
    name: 'Alice',
    account: '0xasdf'
}, {
    name: 'Bob',
    account: '0xasdf'
}];

class Option extends React.PureComponent<SelectAddressOption> {
    handleMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }
    
    render() {
        const {option} = this.props;
        return (
            <div
                className="select-address-option"
                onMouseDown={this.handleMouseDown}
            >
            {option.name}
            </div>
        );
    }
}

class InputPanel extends React.PureComponent<InputPanelProps, InputPanelState> {
    state = {
        option: null,
        amount: undefined
    };

    handleSelectAddress = (option) => {
        event.preventDefault();
        event.stopPropagation();
        
        this.setState((state) => ({
            ...state,
            option
        }));
    }

    valueRenderer = (option) => (
        <span>Send to address: <strong>{option.name}</strong></span>
    )

    arrowRenderer = ({isOpen}) => (
        <img 
            className={`alice-input-panel_address-dropdown${isOpen ? ' opened' : ''}`} 
            src={isOpen ? dropdownWhite : dropdown}
        />
    )

    handleChangeAmount = (e: React.FormEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        
        const amount = parseInt(value, 10);
        this.setState((state) => ({
            ...state,
            amount: isNaN(amount) ? state.amount : amount 
        }));
    }

    handleSetMaxAmount = () => {
        this.setState((state) => ({
            ...state,
            amount: this.props.balance
        }));
    }

    render() {
        return (
            <div className="alice-input-panel">
                <div className="alice-input-panel_address">
                    <Select
                        className="alice-input-panel_address-text"
                        optionComponent={Option}
                        options={users}
                        onChange={this.handleSelectAddress}
                        placeholder="Select address"
                        searchable={false}
                        multi={false}
                        value={this.state.option}
                        valueRenderer={this.valueRenderer}
                        valueKey="account"
                        labelKey="name"
                        clearable={false}
                        arrowRenderer={this.arrowRenderer}
                    />
                </div>

                <div className="alice-input-panel_amount">
                    <input
                        className="alice-input-panel_amount-text"
                        type="text"
                        placeholder="Send amount"
                        value={this.state.amount}
                        onChange={this.handleChangeAmount}
                    />
                    <button className="alice-input-panel_amount-max" onClick={this.handleSetMaxAmount}>max</button>
                </div>

                <SendButton />
            </div>
        );
    }
}

export default InputPanel;