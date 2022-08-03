import * as React from 'react';

import EmptyState from '../EmptyState';
import LoadingState from '../LoadingState';

import './List.scss';

function List({ children, loading }) {
  return loading ? (
    <LoadingState />
  ) : children.length ? (
    <div className='list'>{children}</div>
  ) : (
    <EmptyState />
  );
}

export default List;
