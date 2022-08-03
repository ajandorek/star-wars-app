import * as React from 'react';
import { Link } from 'react-router-dom';

import './StyledLink.scss';

function StyledLink({ to, value }) {
  return <Link to={to} className='styledLink'>{value}</Link>;
}

export default StyledLink;
