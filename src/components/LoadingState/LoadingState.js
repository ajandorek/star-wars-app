import * as React from 'react';

import { LoadingSpinner } from '../../assets/Icons';

import './LoadingState.scss';

function LoadingState() {
  return (
    <div className='loadingWrapper'>
      <img src={LoadingSpinner} alt='loading spinner' className='loadingSpinner' />
    </div>
  );
}

export default LoadingState;
