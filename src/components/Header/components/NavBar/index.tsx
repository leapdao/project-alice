import * as React from 'react';

const github = require('./img/social-github.svg');
const githubWhite = require('./img/social-github-white.svg');
const twitter = require('./img/social-twitter.svg');
const twitterWhite = require('./img/social-twitter-white.svg');

import './style.scss';

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <a href="https://leapdao.org/">LEAP DAO</a>
      </li>
      <li className="nav-social">
        <a href="https://twitter.com/leapdao" target="_blank">
          <img className="nav-social-icon" src={twitter} />
          <img className="nav-social-icon-white" src={twitterWhite} />
        </a>
      </li>
      <li className="nav-social">
        <a href="https://github.com/leap-dao" target="_blank">
          <img className="nav-social-icon" src={github} />
          <img className="nav-social-icon-white" src={githubWhite} />
        </a>
      </li>
    </ul>
  </nav>
);

export default NavBar;
