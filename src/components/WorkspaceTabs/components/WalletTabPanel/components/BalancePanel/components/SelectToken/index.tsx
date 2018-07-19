import * as React from "react";
import Select, { OptionComponentProps, OptionValues } from "react-select";

import "./style.scss";
import { Token } from "../../../../types";
import { ALICE_PUBLIC_ADDRESS, BOB_PUBLIC_ADDRESS, CHARLIE_PUBLIC_ADDRESS } from "../../../../../../../../config";

const dropdown = require("./img/dropdown.svg");
const dropdownWhite = require("./img/dropdown-white.svg");

export type SelectTokenProps = {
    selected: Token,
    tokens: Array<Token>
    onChange: (token: Token) => void
};

export type SelectTokenState = {
    selected: Token | null
};

class Option extends React.PureComponent<OptionComponentProps<OptionValues>> {
    handleMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        this.props.onSelect(this.props.option, event);
    }

    render() {
        const { option } = this.props;
        return (
            <div className="alice-balance-panel_balance" onMouseDown={this.handleMouseDown}>
                <img src={option.icon} className="alice-balance-panel_balance-icon" />
                <span>Balance: <strong>{option.balance} {option.symbol}</strong></span>
            </div>
        );
    }
}

export default class SelectToken extends React.PureComponent<SelectTokenProps, SelectTokenState> {

    static defaultProps = {
        tokens: []
    };

    valueRenderer = (token) => (
        <div className="alice-balance-panel_balance">
            <img src={token.icon} className="alice-balance-panel_balance-icon" />
            <span>Balance: <strong>{token.balance} {token.symbol}</strong></span>
        </div>
    )

    arrowRenderer = ({ isOpen }) => (
        <img
            className={`select-token-dropdown${isOpen ? " opened" : ""}`}
            src={isOpen ? dropdownWhite : dropdown}
        />
    )

    handleSelectToken = (token: Token) => {

        this.props.onChange(token);
    }

    render() {
        const {tokens} = this.props;
        return tokens.length > 0 ? (
            <Select
                className="select-token"
                optionComponent={Option}
                options={tokens.filter((t => t.symbol !== this.props.selected.symbol))}
                placeholder="Select address"
                onChange={this.handleSelectToken}
                searchable={false}
                multi={false}
                value={this.props.selected}
                valueRenderer={this.valueRenderer}
                valueKey="account"
                labelKey="name"
                clearable={false}
                arrowRenderer={this.arrowRenderer}
            />
        ) : null;
    }
}