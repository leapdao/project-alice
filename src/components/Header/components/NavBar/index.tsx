import * as React from "react";

const facebook = require("./img/social-facebook.svg");
const github = require("./img/social-github.svg");
const telegram = require("./img/social-telegram.svg");
const twitter = require("./img/social-twitter.svg");

import "./style.scss";

const NavBar = () => (
    <nav>
        <ul>
            <li>
                <a href="https://parseclabs.org/">Home</a>
            </li>
            <li>
                <a href="https://parseclabs.org/files/plasma-computation.pdf">Whitepaper</a>
            </li>
            <li>
                <a href="https://t.me/parseclabs" target="_blank">
                    <img className="nav-social-icon" src={telegram} />
                </a>
            </li>
            <li>
                <a href="https://twitter.com/Parsec_Labs" target="_blank">
                    <img className="nav-social-icon" src={twitter} />
                </a>
            </li>
            <li>
                <a href="https://www.facebook.com/parsecIabs/" target="_blank">
                    <img className="nav-social-icon" src={facebook} />
                </a>
            </li>
            <li>
                <a href="https://github.com/parsec-labs" target="_blank">
                    <img className="nav-social-icon" src={github} />
                </a>
            </li>
        </ul>
    </nav>
);

export default NavBar;