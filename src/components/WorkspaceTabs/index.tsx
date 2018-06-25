import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const alice = require("./img/alice.svg");
const bob = require("./img/bob.svg");
const charlie = require("./img/charlie.svg");
const help = require("./img/help.svg");

import { createWalletTabPanel } from "./components/WalletTabPanel";
import HelpTabPanel from "./components/HelpTabPanel";
import PulsaitingDot from "./components/PulsaitingDot";

import "./style.scss";
import { observer, inject } from "mobx-react";
const PropTypes = require("prop-types");

const AliceWalletTabPanel = createWalletTabPanel("alice");
const BobWalletTabPanel = createWalletTabPanel("bob");
const CharlieWalletTabPanel = createWalletTabPanel("charlie");

class WalletTab extends React.Component<any> {
    state = {
        pulsar: false
    };

    static getDerivedStateFromProps = (props, state) => {
        if (
            state.pulsar === true &&
            props.active === true
        ) {
            state.pulsar = false;
        }

        return state;
    }

    get(props: any, state: any) {
        if (
            this.props.active === false &&
            this.props.store.transactions.length !== props.store.transactions.length
        ) {
            this.state.pulsar = true;
        }
    }

    render() {
        return (
            <div className="tab">
                <img className="react-tabs__tab-icon" src={this.props.icon} />
                <span className="react-tabs__tab-label">{this.props.name}</span>
                {
                    this.state.pulsar && <PulsaitingDot />
                }
            </div>
        );
    }
}

const createWalletTab = (wallet: string) => inject((store: any) => ({
    store: store[wallet]
}))(observer(WalletTab));

const AliceWalletTab = createWalletTab("alice");
const BobWalletTab = createWalletTab("bob");
const CharlieWalletTab = createWalletTab("charlie");

export default class WorkspaceTabs extends React.Component {
    state = {
        active: 0
    };

    handleSelect = (active) => {
        this.setState((state) => ({
            active
        }));
    }

    render() {
        return (
            <Tabs onSelect={this.handleSelect}>
                <TabList>
                    <Tab>
                        <AliceWalletTab name="Alice" icon={alice} active={this.state.active === 0}/>
                    </Tab>
                    <Tab>
                        <BobWalletTab name="Bob" icon={bob} active={this.state.active === 1}/>
                    </Tab>
                    <Tab>
                        <CharlieWalletTab name="Charlie" icon={charlie} active={this.state.active === 2}/>
                    </Tab>
                    <Tab className="react-tabs__tab flex-right">
                        <div className="tab tab-help">
                            <img className="react-tabs__tab-icon" src={help} />
                            <span className="react-tabs__tab-label">Help</span>
                        </div>
                    </Tab>
                </TabList>

                <TabPanel>
                    <AliceWalletTabPanel />
                </TabPanel>
                <TabPanel>
                    <BobWalletTabPanel />
                </TabPanel>
                <TabPanel>
                    <CharlieWalletTabPanel />
                </TabPanel>
                <TabPanel>
                    <HelpTabPanel />
                </TabPanel>
            </Tabs>
        );
    }
}