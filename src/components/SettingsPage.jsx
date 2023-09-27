import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export default function SettingsPage({ settings, setSettings }) {
  const categoryList = JSON.parse(sessionStorage.getItem("categoryList"));

  const {
    difficultyLevel,
    categoryId,
    questionsAmount,
    questionsType,
    category,
  } = settings;

  const [displayedDifficultyLevel, setDisplayedDifficultyLevel] =
    React.useState(difficultyLevel);
  const [displayedCategory, setDisplayedCategory] = React.useState(category);
  const [displayedQuestionsAmount, setDisplayedQuestionsAmount] =
    React.useState(questionsAmount);
  const [displayedQuestionsType, setDisplayedQuestionsType] =
    React.useState(questionsType);
  const [displayedCategoryId, setDisplayedCategoryId] =
    React.useState(categoryId);

  function handleClick() {
    setSettings(() => ({
      difficultyLevel: displayedDifficultyLevel,
      categoryId: displayedCategoryId,
      questionsAmount: displayedQuestionsAmount,
      questionsType: displayedQuestionsType,
      category: displayedCategory,
    }));
  }

  function findCategoryId(categoryName) {
    const categoryObj = categoryList.trivia_categories.find(
      (obj) => obj.name === categoryName
    );
    if (categoryObj === undefined) {
      return;
    }
    setDisplayedCategoryId(categoryObj.id);
  }

  function handleCategoryChange(event) {
    setDisplayedCategory(event.target.value);
    findCategoryId(event.target.value);
  }
  return (
    <div className="settings-page-background">
      <div className="settings-page-container">
        <h2>Settings</h2>

        <form>
          {/* CATEGORIES */}
          <label htmlFor="category" className="settings-page-text">
            Choose category:
            <select
              name="categories"
              id="category"
              onChange={(event) => handleCategoryChange(event)}
              value={displayedCategory}
            >
              {categoryList.trivia_categories.map((categoryObject) => (
                <option key={nanoid()} value={categoryObject.name}>
                  {categoryObject.name}
                </option>
              ))}
            </select>
          </label>

          <hr />
          {/* DIFFICULTY LEVEL */}
          <p className="settings-page-text setting-page-correct-margin">
            Difficulty level:
          </p>
          <label htmlFor="Easy">
            Easy
            <input
              type="radio"
              id="Easy"
              name="difficulty_level"
              value="easy"
              onChange={(event) =>
                setDisplayedDifficultyLevel(event.target.value)
              }
              checked={displayedDifficultyLevel === "easy"}
            />
          </label>
          <br />

          <label htmlFor="Medium">
            Medium
            <input
              type="radio"
              id="Medium"
              name="difficulty_level"
              value="medium"
              onChange={(event) =>
                setDisplayedDifficultyLevel(event.target.value)
              }
              checked={displayedDifficultyLevel === "medium"}
            />
          </label>
          <br />

          <label htmlFor="Hard">
            Hard
            <input
              type="radio"
              id="Hard"
              name="difficulty_level"
              value="hard"
              onChange={(event) =>
                setDisplayedDifficultyLevel(event.target.value)
              }
              checked={displayedDifficultyLevel === "hard"}
            />
          </label>
          <br />
          <hr />
          {/* NUMBER OF QUESTIONS */}
          <label className="settings-page-text" htmlFor="number_of_questions">
            Number of questions:&nbsp;
            <select
              id="number_of_questions"
              name="number_of_questions"
              value={displayedQuestionsAmount}
              onChange={(event) =>
                setDisplayedQuestionsAmount(event.target.value)
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </label>
          <hr />
          {/* QUESTIONS TYPE */}
          <p className="settings-page-text setting-page-correct-margin">
            Questions type:
          </p>
          <label htmlFor="true_false">
            True / False
            <input
              type="radio"
              id="true_false"
              name="questions_type"
              value="boolean"
              onChange={(event) =>
                setDisplayedQuestionsType(event.target.value)
              }
              checked={displayedQuestionsType === "boolean"}
            />
          </label>
          <br />
          <label htmlFor="multiple_choice">
            Multiple Choice
            <input
              type="radio"
              id="multiple_choice"
              name="questions_type"
              value="multiple"
              onChange={(event) =>
                setDisplayedQuestionsType(event.target.value)
              }
              checked={displayedQuestionsType === "multiple"}
            />
          </label>
          <br />
          <label htmlFor="both">
            Both
            <input
              type="radio"
              id="both"
              name="questions_type"
              value=""
              onChange={(event) =>
                setDisplayedQuestionsType(event.target.value)
              }
              checked={displayedQuestionsType === ""}
            />
          </label>
          <br />
          <hr />

          {/* SUBMIT SETTINGS */}
          <div className="settings-page-button-holder">
            <Link to="/questions-page">
              <button
                className="settings-page-button"
                type="button"
                onClick={() => handleClick()}
              >
                Confirm
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

SettingsPage.propTypes = {
  settings: PropTypes.shape({
    difficultyLevel: PropTypes.string,
    categoryId: PropTypes.number,
    questionsAmount: PropTypes.number,
    questionsType: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  setSettings: PropTypes.func.isRequired,
};
