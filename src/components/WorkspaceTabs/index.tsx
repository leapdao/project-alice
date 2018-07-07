import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style.scss";
import { observer, inject } from "mobx-react";

import { createWalletTabPanel } from "./components/WalletTabPanel";
import HelpTabPanel from "./components/HelpTabPanel";
import PulsaitingDot from "./components/PulsaitingDot";

const alice = require("./img/alice.svg");
const bob = require("./img/bob.svg");
const charlie = require("./img/charlie.svg");
const help = require("./img/help.svg");

const AliceWalletTabPanel = createWalletTabPanel("alice");
const BobWalletTabPanel = createWalletTabPanel("bob");
const CharlieWalletTabPanel = createWalletTabPanel("charlie");

class WalletTab extends React.Component<any> {
    state = {
        pulsar: false,
        notifications: 0
    };

    static getDerivedStateFromProps = (props, state) => {
        if (
            state.pulsar === true &&
            props.active === true
        ) {
            state.pulsar = false;
            state.notifications = props.store.notifications;

        } else if (
            props.active === false &&
            props.store.notifications !== state.notifications
        ) {
            state.pulsar = true;
        } else if (
            props.active === true
        ) {
            state.notifications = props.store.notifications;
        }

        return state;
    }

    render() {
        return (
            <div className="tab">
                <img className="react-tabs__tab-icon" src={this.props.icon} />
                <span className="react-tabs__tab-label">{this.props.name}</span>
                {this.state.pulsar ? <PulsaitingDot/> : null}
                <input type="hidden" value={this.props.store.notifications}/>
            </div>
        );
    }
}

const AliceWalletTab = inject((store: any) => ({ store: store.alice }))(observer(WalletTab));
const BobWalletTab = inject((store: any) => ({ store: store.bob }))(observer(WalletTab));
const CharlieWalletTab = inject((store: any) => ({ store: store.charlie }))(observer(WalletTab));

class WorkspaceTabs extends React.Component<any> {
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
                        <AliceWalletTab name="Alice" icon={alice} active={this.state.active === 0} />
                    </Tab>
                    <Tab>
                        <BobWalletTab name="Bob" icon={bob} active={this.state.active === 1} />
                    </Tab>
                    <Tab>
                        <CharlieWalletTab name="Charlie" icon={charlie} active={this.state.active === 2} />
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

export default WorkspaceTabs;