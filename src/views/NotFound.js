import * as React from 'react';

import { StyledLink } from '../components';

function NotFound() {
  return (
    <>
      <h1>Page Not Found...</h1>
      <StyledLink to='planets' value='Click here to return to planets page' />
    </>
  )
}

export default NotFound;
