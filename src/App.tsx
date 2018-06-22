require("dotenv").config({ path: ".env" });
import * as React from "react";
import { Provider } from "mobx-react";

import "react-table/react-table.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WorkspaceTabs from "./components/WorkspaceTabs";

import "./styles/app.scss";
import Store from "./store";

import {
  ALICE_PUBLIC_ADDRESS,
  BOB_PUBLIC_ADDRESS,
  CHARLIE_PUBLIC_ADDRESS
} from "./config";

const store = {
  alice: new Store(ALICE_PUBLIC_ADDRESS),
  bob: new Store(BOB_PUBLIC_ADDRESS),
  charlie: new Store(CHARLIE_PUBLIC_ADDRESS)
};

export default () => (
  <div className="container">
    <Header />
    <Provider {...store}>
      <WorkspaceTabs/>
    </Provider>
    <Footer />
  </div>
);