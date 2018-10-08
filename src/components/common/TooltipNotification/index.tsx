import * as React from 'react';

import Checkmark from '../Checkmark';
import { TooltipNotificationProps } from './types';

import './style.scss';

const TooltipNotification = (props: TooltipNotificationProps) => (
  <div
    className={`tooltip-notification${props.hidden ? ' hidden' : ''}`}
    style={props.style}
  >
    <div className="tooltip-notification_icon">
      <Checkmark animation={true} />
    </div>
    <span className="tooltip-notification_text" style={props.textStyle}>
      {props.text}
    </span>
  </div>
);

export default TooltipNotification;
