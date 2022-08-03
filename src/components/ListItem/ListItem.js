import * as React from 'react';
import { Link } from 'react-router-dom';

import Gradient from '../Gradient';

import './ListItem.scss';

function ListItem({ to, handleClick, value, backgroundId }) {
  return (
    <Link to={to} onClick={handleClick} className='listItem'>
      {/* Gradient in lieu of a placeholder image */}
      <Gradient id={backgroundId} />
      <div className='listItemTextWrapper'>
        <span className='listItemText'>{value}</span>
      </div>
    </Link>
  );
}

export default ListItem;
