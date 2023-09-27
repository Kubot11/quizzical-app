import { React } from "react";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div className="start-page-container">
      <h1 className="start-page-title">Quizzical</h1>
      <p className="start-page-description">answer questions and earn points</p>
      <Link to="/questions-page">
        <button className="start-page-button" type="button">
          Start quiz
        </button>
      </Link>
    </div>
  );
}
