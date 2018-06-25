import * as React from "react";
import Select, { OptionComponentProps, OptionValues } from "react-select";

import SendButton from "./components/SendButton";
import { InputPanelProps, SelectAddressOption, InputPanelState } from "./types";

const dropdown = require("./img/dropdown.svg");
const dropdownWhite = require("./img/dropdown-white.svg");

import {
    ALICE_PUBLIC_ADDRESS,
    BOB_PUBLIC_ADDRESS,
    CHARLIE_PUBLIC_ADDRESS
} from "./../../../../../../config";

const users = [{
    name: "Alice",
    account: ALICE_PUBLIC_ADDRESS
}, {
    name: "Bob",
    account: BOB_PUBLIC_ADDRESS
}, {
    name: "Charlie",
    account: CHARLIE_PUBLIC_ADDRESS
}];

class Option extends React.PureComponent<OptionComponentProps<OptionValues>> {
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

class InputPanel extends React.PureComponent<any, InputPanelState> {
    state = {
        receiver: null,
        amount: undefined
    };

    handleSelectAddress = (receiver) => {
        event.preventDefault();
        event.stopPropagation();
        
        this.setState((state) => ({
            ...state,
            receiver
        }));
    }

    valueRenderer = (receiver) => (
        <span>Send to address: <strong>{receiver.name}</strong></span>
    )

    arrowRenderer = ({isOpen}) => (
        <img 
            className={`alice-input-panel_address-dropdown${isOpen ? " opened" : ""}`} 
            src={isOpen ? dropdownWhite : dropdown}
        />
    )

    handleChangeAmount = (e: React.FormEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        
        const amount = parseInt(value, 10);
        this.setState((state) => ({
            ...state,
            amount: isNaN(amount) ? value === "" ? value : state.amount : amount,
        }));
    }

    handleSetMaxAmount = () => {
        const { balance } = (this.props as any);
        this.setState((state) => ({
            ...state,
            amount: balance,
        }));
    }

    handleSendTransaction = () => {
        this.props.onSend(this.state.receiver.account, this.state.amount);
    }

    render() {
        return (
            <div className="alice-input-panel">
                <div className="alice-input-panel_address">
                    <Select
                        className="alice-input-panel_address-text"
                        optionComponent={Option}
                        options={users.filter((u => u.account !== this.props.address))}
                        onChange={this.handleSelectAddress}
                        placeholder="Select address"
                        searchable={false}
                        multi={false}
                        value={this.state.receiver}
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

                <SendButton onClick={this.handleSendTransaction}/>
            </div>
        );
    }
}

export default InputPanel;