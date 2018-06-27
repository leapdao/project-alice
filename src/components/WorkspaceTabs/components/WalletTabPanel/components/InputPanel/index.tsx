import * as React from "react";
import BigNumber from "bignumber.js";
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
    };

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

const decimals = new BigNumber(10).pow(18); // ToDo: fetch value from token contract for plasma chain

class InputPanel extends React.PureComponent<any, InputPanelState> {
    state: InputPanelState = {
        receiver: null,
        amount: undefined,
        sending: false,
    };

    handleSelectAddress = (receiver) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({receiver});
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
        const { value } = e.currentTarget;

        console.log(value)
        this.setState({
            amount: /^\d*\.?\d*$/.test(value) ? value : value === "" ? value : this.state.amount ,
        });
    }

    handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        const balance = Number(new BigNumber((this.props as any).balance).div(decimals).toPrecision(2));
        this.setState(state => {
            const amount = Number(state.amount);
            if (isNaN(amount) || !amount || amount < 0) {
                return {amount: ""};
            }

            return {
                amount: String(Math.min(balance, amount))
            };
        });
    }

    handleSetMaxAmount = () => {
        const {balance} = (this.props as any);
        this.setState({
            amount: new BigNumber(balance).div(decimals).toPrecision(2),
        });
    }

    handleSendTransaction = async () => {
        const {amount} = this.state;
        const {balance} = (this.props as any);
        if (amount && this.state.receiver) {
            this.setState({sending: true});
            try {
                await this.props.onSend(
                    this.state.receiver.account,
                    BigNumber.min(new BigNumber(amount).times(decimals), balance).toNumber(),
                );
            } finally {
                this.setState({amount: undefined, receiver: null, sending: false});
            }
        }
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

                <label className="alice-input-panel_amount-wrapper">
                    <input
                        className="alice-input-panel_amount"
                        type="text"
                        placeholder="Send amount"
                        value={this.state.amount || ""}
                        onChange={this.handleChangeAmount}
                        onBlur={this.handleBlur}
                    />
                    <button
                        className="alice-input-panel_amount-max"
                        onClick={this.handleSetMaxAmount}
                    >
                        max
                    </button>
                </label>

                <SendButton
                    disabled={this.state.sending}
                    onClick={this.handleSendTransaction}
                />
            </div>
        );
    }
}

export default InputPanel;