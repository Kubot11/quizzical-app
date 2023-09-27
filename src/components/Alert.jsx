import React from "react";
import PropTypes from "prop-types";

export default function Alert({ setAlert, alertText }) {
  function hideAlert() {
    setAlert(false);
  }
  return (
    <div className="alert-background">
      <div className="alert-container">
        <p className="alert-text">{alertText}</p>
        <button type="button" className="alert-button" onClick={hideAlert}>
          Ok
        </button>
      </div>
    </div>
  );
}

Alert.propTypes = {
  setAlert: PropTypes.func.isRequired,
  alertText: PropTypes.string.isRequired,
};
