import * as React from 'react';

import imageUrlGenerator from '../../utils/imageUrlGenerator';

import './Card.scss';

function Card({header, values, item}) {
  return (
    <div className='card'>
      <div>
        <div className='cardHeader'>{header}</div>
      </div>
      <div className='cardWrapper'>
        <div className='cardImageWrapper'>
          <img src={imageUrlGenerator()} alt={header} className='cardImage' />
        </div>
        <ul>
          {values.map(field => (
            <li key={field}>{field.split('_').join(' ')}: {item[field]}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Card;