import * as React from 'react';

import './Input.scss';

function Input({ handleChange, label }) {
  return (
    <>
      <label>{label}</label>
      <input className='input' onChange={handleChange} />
    </>
  );
}

export default Input;
