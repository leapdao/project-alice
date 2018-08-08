require("dotenv").config({ path: ".env" });
import * as React from "react";
import { Provider } from "mobx-react";

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
} from "./config";
import { Token } from "./components/WorkspaceTabs/components/WalletTabPanel/types";

import { TokensContext } from "./contexts";
export default class App extends React.PureComponent {

    store: any = {};

    state = {
      tokens: [],
      selected: null,
    };

    constructor(props: any) {
      super(props);

      this.store = {
        alice: new Store({
            color: 0,
            address: ALICE_PUBLIC_ADDRESS,
            key: ALICE_PRIVATE_KEY
        }),
        bob: new Store({
            color: 0,
            address: BOB_PUBLIC_ADDRESS,
            key: BOB_PRIVATE_KEY
        }),
        charlie: new Store({
            color: 0,
            address: CHARLIE_PUBLIC_ADDRESS,
            key: CHARLIE_PRIVATE_KEY
        }),
      };
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

      Object.keys(this.store).forEach(key => {
        this.store[key].setTokens(tokens.map((t: any) => t.token));
      });

      this.setState(() => ({
        tokens,
        selected: tokens[0],
      }));
    }

    onChangeToken = (token: Token) => {
        const color = this.state.tokens.findIndex((t) => (
            t.token.options.address === token.token.options.address
        ));
        this.store.alice.color = color;
        this.store.bob.color = color;
        this.store.charlie.color = color;
        this.store.alice.token = token.token;
        this.store.bob.token = token.token;
        this.store.charlie.token = token.token;
        this.setState(() => ({
            selected: token
        }));
    }

  render() {
    const { tokens, selected } = this.state;
    const token = selected && selected.token;
    const color = tokens.findIndex((t) => (
      t.token.options.address === token.options.address
    ));

    const context = {
      tokens,
      changeToken: this.onChangeToken,
      selected: this.state.selected,
      color
    };

    return (
      <div className="container">
        <Header />
        <Provider {...this.store}>
          <TokensContext.Provider value={context}>
            <WorkspaceTabs />
          </TokensContext.Provider>
        </Provider>
        <Footer />
      </div>
    );
  }
}