// eslint-disable-next-line import/no-extraneous-dependencies
// import PropTypes from 'gi-types';
import React from 'react';

export default function StartPage({ setIsStartPage }) {
  function startGame() {
    setIsStartPage(false);
  }
  return (
    <div className="start-page-container">
      <h1 className="title">Quizzical</h1>
      <p className="description">answer questions and earn points</p>
      <button className="start-button" type="button" onClick={startGame}>Start quiz</button>

    </div>
  );
}

// StartPage.propTypes = {
//   setIsStartPage: PropTypes.func.isRequired,

// };
