/* ts-lint-ignore max-line-length*/
import * as React from "react";

import "./style.scss";

const HelpTabPanel = () => (
    <div className="help-tab-panel">
        <p>
            Welcome to Project Alice!{" "}
            It’s a small showcase of PARSEC chain capabilities.{" "}
            The main purpose of this page is to show you how transactions are working in our chain.
        </p>

        <p>
            Here you have three users (Alice, Charlie and Bob){" "}
            and you can send any transaction from one user to another!{" "}
            If you need tx hash and all tx history - it's also available.
        </p>

        <p>Try it! Send some transactions! : )</p>

        <p>PARSEC Labs</p>
    </div>
);

export default HelpTabPanel;