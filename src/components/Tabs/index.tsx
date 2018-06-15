import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const slice = require('./img/alice.svg');
const bob = require('./img/bob.svg');
const charlie = require('./img/charlie.svg');
const help = require('./img/help.svg');

import AliceTabPanel from './components/AliceTabPanel';
import BobTabPanel from './components/AliceTabPanel';
import CharlieTabPanel from './components/AliceTabPanel';
import HelpTabPanel from './components/HelpTabPanel';
import PulsaitingDot from './components/PulsaitingDot';

import './style.scss';

class AliceTabs extends React.PureComponent {
    
    state = {};
    
    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>
                        <div className="tab">
                            <img className="react-tabs__tab-icon" src={slice}/>
                            <span className="react-tabs__tab-label">Alice</span>
                        </div>
                    </Tab>
                    <Tab>
                        <div className="tab">
                            <img className="react-tabs__tab-icon" src={bob}/>    
                            <span className="react-tabs__tab-label">Bob</span>
                            <PulsaitingDot />
                        </div>
                    </Tab>
                    <Tab>
                        <div className="tab">
                            <img className="react-tabs__tab-icon" src={charlie}/>
                            <span className="react-tabs__tab-label">Charlie</span>
                        </div>
                    </Tab>
                    <Tab className="react-tabs__tab flex-right">
                        <div className="tab tab-help">
                            <img className="react-tabs__tab-icon" src={help}/>
                            <span className="react-tabs__tab-label">Help</span>
                        </div>
                    </Tab>
                </TabList>

                <TabPanel>
                    <AliceTabPanel />
                </TabPanel>
                <TabPanel>
                    <BobTabPanel  />
                </TabPanel>
                <TabPanel>
                    <CharlieTabPanel  />
                </TabPanel>
                <TabPanel>
                    <HelpTabPanel  />
                </TabPanel>
            </Tabs>
        );
    }
}

export default AliceTabs;