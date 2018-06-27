import * as React from "react";

import NavBar from "./components/NavBar";

import "./style.scss";

const logo = require("./img/logo-white.svg");

export default () => (
    <header>
        <a href="https://parseclabs.org/">
            <img id="logo" src={logo} alt="PARSEC Labs" />
        </a>
        <NavBar />
    </header>
);