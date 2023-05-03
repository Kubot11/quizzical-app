import React from 'react';

export default function Alert({ setAlert, alertText }) {
  function hideAlert() {
    setAlert(false);
  }
  return (
    <div className='opacity-background'>
    <div className="alert-container">
      <p className="alert-text">{alertText}</p>
      <button type="button" className="alert-button" onClick={hideAlert}>Ok</button>
    </div>
    </div>
  );
}
