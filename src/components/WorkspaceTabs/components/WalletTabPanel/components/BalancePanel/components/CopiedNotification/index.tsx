import * as React from "react";

import Checkmark from "../../../../../../../common/Checkmark";

import "./style.scss";

const CopiedNotification = (props: {hidden: boolean}) => (
    <div className={`copied-notification${props.hidden ? " hidden" : ""}`}>
        <div className="copied-notification_icon"><Checkmark animation={true}/></div>
        <span className="copied-notification_text">Address copied to clipboard</span>
    </div>
);

export default CopiedNotification;