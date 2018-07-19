require("dotenv").config({ path: ".env" });
import * as React from "react";
import { Provider } from "mobx-react";
import { Contract } from "web3/types";
import { findIndex } from "lodash";

import "react-table/react-table.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WorkspaceTabs from "./components/WorkspaceTabs";

import "./styles/app.scss";
import Store from "./store";

import getWeb3 from "./getWeb3";

import TOKEN_ABI from "./abis/token";

import {
  ALICE_PUBLIC_ADDRESS,
  BOB_PUBLIC_ADDRESS,
  CHARLIE_PUBLIC_ADDRESS,
  ALICE_PRIVATE_KEY,
  BOB_PRIVATE_KEY,
  CHARLIE_PRIVATE_KEY,
  TOKEN_CONTRACT_ADDRESS,
} from "./config";
import { Token } from "./components/WorkspaceTabs/components/WalletTabPanel/types";

import { TokensContext } from "./contexts";
export default class App extends React.PureComponent {

  state = {
    ready: false,
    tokens: [],
    selected: null
  };

  constructor(props: any) {
    super(props);

    this.load();
  }

  load = async () => {
    const node = getWeb3();
    const rinkeby = getWeb3(true);

    const colors = await node.getColors();

    const tokens = await Promise.all(colors.map(async (color) => {
      const contract = await new rinkeby.eth.Contract(TOKEN_ABI, color);
      const symbol = await contract.methods.symbol().call();
      const decimals = await contract.methods.decimals().call();

      const token = await new node.eth.Contract(TOKEN_ABI, color);

      const balances = await Promise.all([
        token.methods.balanceOf(ALICE_PUBLIC_ADDRESS).call(),
        token.methods.balanceOf(BOB_PUBLIC_ADDRESS).call(),
        token.methods.balanceOf(CHARLIE_PUBLIC_ADDRESS).call(),
      ]);

      return {
        symbol,
        decimals: decimals,
        balances,
        token
      };
    }));

    this.setState(() => ({
      tokens: tokens,
      selected: tokens[0],
      ready: true
    }));
  }

  onChangeToken = (token: Token) => {
    this.setState(() => ({
      selected: token
    }));
  }

  render() {
    if (this.state.ready) {
      const token = this.state.selected.token;
      const color = findIndex(this.state.tokens, (t) => (
        t.token.options.address === token.options.address
      ));

      const store = {
        alice: new Store({
          token,
          color,
          address: ALICE_PUBLIC_ADDRESS,
          key: ALICE_PRIVATE_KEY
        }),
        bob: new Store({
          token,
          color,
          address: BOB_PUBLIC_ADDRESS,
          key: BOB_PRIVATE_KEY
        }),
        charlie: new Store({
          token,
          color,
          address: CHARLIE_PUBLIC_ADDRESS,
          key: CHARLIE_PRIVATE_KEY
        }),
      };

      return (
        <div className="container">
          <Header />
          <Provider {...store}>
            <TokensContext.Provider value={{tokens: this.state.tokens, changeToken: this.onChangeToken, selected: this.state.selected}}>
              <WorkspaceTabs />
            </TokensContext.Provider>
          </Provider>
          <Footer />
        </div>
      );
    } else {
      return null;
    }
  }
}