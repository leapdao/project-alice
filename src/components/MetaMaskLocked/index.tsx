import * as React from "react";

import "./style.scss";

const lock = require("./img/metamask-lock.svg");

const MetaMaskLocked = () => (
    <div className="metamask-lock-body">
        <img src={lock} className="metamask-lock-body_lock"/>
        <h2 className="metamask-lock-body_header">Your metamask is locked</h2>
        <p className="metamask-lock-body_description">Simply open MetaMask and follow the instructions to unlock it.</p>
        <div className="metamask-lock-body_text">
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. 
                Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
                nisl ut aliquip ex ea commodo consequat.</p>
            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, 
                vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim 
                qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod 
                tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
            <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
                nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit 
                in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis 
                at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril 
                delenit augue duis dolore te feugait nulla facilisi.</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod 
                tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, 
                quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, 
                vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.</p>
        </div>
    </div>
);

export default MetaMaskLocked;