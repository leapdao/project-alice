import * as React from 'react';

import 'react-table/react-table.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Tabs from './components/Tabs';
import MetaMaskLocked from './components/MetaMaskLocked';

import './styles/app.scss';

function App() {
  return (
    <div className="container">
      <Header/>
      <Tabs/>
      <Footer/>
    </div>
  );
}

export default App;