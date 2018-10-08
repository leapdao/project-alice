import * as React from 'react';

import './style.scss';

export default (props: any) => (
  <div
    className={`tx-checkmark${
      props.animation ? ' tx-checkmark-with-animation' : ''
    }`}
  />
);
