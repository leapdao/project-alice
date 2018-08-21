import "./style.scss";

import * as React from "react";
import { observer } from "mobx-react";
import Select, { OptionComponentProps, OptionValues } from "react-select";

import { Token } from "../../../../types";
import { fromCents } from "../../../../../../../../utils";

const dropdown = require("./img/dropdown.svg");
const dropdownWhite = require("./img/dropdown-white.svg");

export type SelectTokenProps = {
    selected: Token,
    color: number,
    balances: Array<any>,
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
        const balance = fromCents(option.balance, option.decimals);
        return (
            <div className="alice-balance-panel_balance" onMouseDown={this.handleMouseDown}>
                <img src={require(`./icons/${option.symbol}.svg`)} className="alice-balance-panel_balance-icon" />
                <span>Balance: <strong>{balance} {option.symbol}</strong></span>
            </div>
        );
    }
}

@observer
export default class SelectToken extends React.Component<SelectTokenProps, SelectTokenState> {

    static defaultProps = {
        tokens: []
    };

    valueRenderer = (token) => {
        const balance = this.props.balances ? this.props.balances[this.props.color] : 0;

        return (
            <div className="alice-balance-panel_balance">
                <img src={require(`./icons/${token.symbol}.svg`)} className="alice-balance-panel_balance-icon" />
                <span>Balance: <strong>{fromCents(balance, token.decimals)} {token.symbol}</strong></span>
            </div>
        );
    }

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