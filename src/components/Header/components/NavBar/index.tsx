import * as React from "react";

const facebook = require("./img/social-facebook.svg");
const facebook_white = require("./img/social-facebook-white.svg");
const github = require("./img/social-github.svg");
const github_white = require("./img/social-github-white.svg");
const telegram = require("./img/social-telegram.svg");
const telegram_white = require("./img/social-telegram-white.svg");
const twitter = require("./img/social-twitter.svg");
const twitter_white = require("./img/social-twitter-white.svg");

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
                    <img className="nav-social-icon-white" src={telegram_white} />
                </a>
            </li>
            <li className="nav-social">
                <a href="https://twitter.com/Parsec_Labs" target="_blank">
                    <img className="nav-social-icon" src={twitter} />
                    <img className="nav-social-icon-white" src={twitter_white} />
                </a>
            </li>
            <li className="nav-social">
                <a href="https://www.facebook.com/parsecIabs/" target="_blank">
                    <img className="nav-social-icon" src={facebook} />
                    <img className="nav-social-icon-white" src={facebook_white} />
                </a>
            </li>
            <li className="nav-social">
                <a href="https://github.com/parsec-labs" target="_blank">
                    <img className="nav-social-icon" src={github} />
                    <img className="nav-social-icon-white" src={github_white} />
                </a>
            </li>
        </ul>
    </nav>
);

export default NavBar;