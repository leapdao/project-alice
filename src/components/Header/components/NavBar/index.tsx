import * as React from "react";

const facebook = require("./img/social-facebook.svg");
const facebookWhite = require("./img/social-facebook-white.svg");
const github = require("./img/social-github.svg");
const githubWhite = require("./img/social-github-white.svg");
const telegram = require("./img/social-telegram.svg");
const telegramWhite = require("./img/social-telegram-white.svg");
const twitter = require("./img/social-twitter.svg");
const twitterWhite = require("./img/social-twitter-white.svg");

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
            <li className="nav-social">
                <a href="https://t.me/parseclabs" target="_blank">
                    <img className="nav-social-icon" src={telegram} />
                    <img className="nav-social-icon-white" src={telegramWhite} />
                </a>
            </li>
            <li className="nav-social">
                <a href="https://twitter.com/Parsec_Labs" target="_blank">
                    <img className="nav-social-icon" src={twitter} />
                    <img className="nav-social-icon-white" src={twitterWhite} />
                </a>
            </li>
            <li className="nav-social">
                <a href="https://www.facebook.com/parsecIabs/" target="_blank">
                    <img className="nav-social-icon" src={facebook} />
                    <img className="nav-social-icon-white" src={facebookWhite} />
                </a>
            </li>
            <li className="nav-social">
                <a href="https://github.com/parsec-labs" target="_blank">
                    <img className="nav-social-icon" src={github} />
                    <img className="nav-social-icon-white" src={githubWhite} />
                </a>
            </li>
        </ul>
    </nav>
);

export default NavBar;