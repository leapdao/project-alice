import * as React from "react";

import NavBar from "./components/NavBar";

import "./style.scss";

const logo = require("./img/logo-white.svg");

export default () => (
    <header>
        <img id="logo" src={logo} alt="PARSEC Labs"/>
        <NavBar/>
    </header>
);