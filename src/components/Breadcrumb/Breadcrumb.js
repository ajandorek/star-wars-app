import * as React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumb.scss';

function Breadcrumb({ active, handleClick, to, value }) {
  return active ? (
    <div>{value}</div>
  ) : (
    <Link to={to} onClick={handleClick} className='breadcrumb'>
      {value}
    </Link>
  );
}

export default Breadcrumb;
