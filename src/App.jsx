import './App.css';
import React from 'react';
import StartPage from './components/StartPage';
import blob from './assets/blob.png';
import blob2 from './assets/blob2.png';
import settingsIcon from './assets/settings_icon.svg';
import QuestionsPage from './components/QuestionsPage';
import SettingsPage from './components/SettingsPage';

function App() {
  const [isStartPage, setIsStartPage] = React.useState(true);
  const [isSettingsPage, setIsSettingsPage] = React.useState(false);

  const [categoryList, setCategoryList] = React.useState({});

  const [difficultyLevel, setDifficultyLevel] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [questionsAmount, setQuestionsAmount] = React.useState(0);
  const [questionsType, setQuestionsType] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [newSettings, setNewSettings] = React.useState(false);

  function fetchCategory() {
    fetch('https://opentdb.com/api_category.php').then((response) => response.json()).then((data) => setCategoryList(data));
  }

  function enableSettings() {
    fetchCategory();
    setIsSettingsPage(true);
  }

  React.useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      { isStartPage
        ? (
          <StartPage
            setIsStartPage={setIsStartPage}

          />
        )
        : (
          <QuestionsPage
            setNewSettings={setNewSettings}
            newSettings={newSettings}
            difficultyLevel={difficultyLevel}
            category={category}
            questionsAmount={questionsAmount}
            questionsType={questionsType}
            categoryId={categoryId}
          />
        )}

      <img className="blob1" src={blob} alt="blob" />
      <img className={isStartPage ? 'blob2-start-page' : 'blob2'} src={blob2} alt="blob" />
      <img
        className="settings-icon"
        onClick={enableSettings}
        src={settingsIcon}
        alt="settings-icon"
      />
      { isSettingsPage && (
      <SettingsPage
        setNewSettings={setNewSettings}
        categoryList={categoryList}
        difficultyLevel={difficultyLevel}
        setDifficultyLevel={setDifficultyLevel}
        category={category}
        setCategory={setCategory}
        questionsAmount={questionsAmount}
        setQuestionsAmount={setQuestionsAmount}
        questionsType={questionsType}
        setQuestionsType={setQuestionsType}
        setCategoryId={setCategoryId}
        setIsSettingsPage={setIsSettingsPage}
      />
      )}
    </>
  );
}

export default App;
