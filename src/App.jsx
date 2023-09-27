import { useState, useEffect, React } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StartPage from "./components/StartPage";
import blob from "./assets/blob.png";
import blob2 from "./assets/blob2.png";
import settingsIcon from "./assets/settings_icon.svg";
import QuestionsPage from "./components/QuestionsPage";
import SettingsPage from "./components/SettingsPage";
import rotateSmartphone from "./assets/smartphone-rotate.svg";

function App() {
  const [settings, setSettings] = useState({
    difficultyLevel: "",
    categoryId: 0,
    questionsAmount: 5,
    questionsType: "",
    category: "",
  });

  function fetchCategory() {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("categoryList", JSON.stringify(data));
      });
  }

  useEffect(() => {
    if (!sessionStorage.getItem("categoryList")) {
      fetchCategory();
    }
  }, []);

  return (
    <>
      <Routes>
        {/* START PAGE */}
        <Route path="/" element={<StartPage />} />
        {/* QUESTIONS PAGE */}
        <Route
          path="/questions-page"
          element={<QuestionsPage settings={settings} />}
        />
        {/* SETTINGS PAGE */}
        <Route
          path="/settings-page"
          element={
            <SettingsPage setSettings={setSettings} settings={settings} />
          }
        />
      </Routes>

      {/* ROTATE SCREEN ALERT */}
      <div className="rotate-smartphone-container">
        <h2 className="rotate-smartphone-text">Please rotate your phone</h2>
        <img
          src={rotateSmartphone}
          className="rotate-smartphone-icon"
          alt="rotate smartphone"
        />
      </div>

      {/* BLOOBS */}
      <img className="app-blob1" src={blob} alt="blob" />
      <img className="app-blob2" src={blob2} alt="blob" />

      <div className="icons-container">
        {/* SETTINGS PAGE ICON */}
        <Link to="/settings-page">
          <img
            className="settings-icon"
            src={settingsIcon}
            alt="settings-icon"
          />
        </Link>

        <Link to="/">
          <div className="home-icon" />
        </Link>
      </div>
    </>
  );
}

export default App;
