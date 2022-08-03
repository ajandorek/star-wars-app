import * as React from 'react';

import generateGradient from '../../utils/generateGradient';

import './Gradient.scss';

function Gradient({ id }) {
  const firstId = id / 100;
  const secondId = id / 101;

  return (
    <div
      style={{ background: generateGradient(firstId, secondId) }}
      className='gradient'
    />
  );
}

export default Gradient;
