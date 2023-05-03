import React from 'react';
import { nanoid } from 'nanoid';

export default function SettingsPage(
  {
    categoryList,
    setDifficultyLevel,
    difficultyLevel,
    category,
    setCategory,
    questionsAmount,
    setQuestionsAmount,
    questionsType,
    setQuestionsType,
    setCategoryId,
    setIsSettingsPage,
    setNewSettings,
  },
) {
  function handleClick() {
    setIsSettingsPage(false);
  }

  function findCategoryId(categoryName) {
    const categoryObj = categoryList.trivia_categories.find((obj) => obj.name === categoryName);
    if (categoryObj === undefined) { return; }
    console.log(categoryObj.id);
    setCategoryId(categoryObj.id);
  }

  function handleCategoryChange(event) {
    console.log(event.target.value);

    setCategory(event.target.value);
    findCategoryId(event.target.value);
  }
  return (
    <div className="background">
      <div className="settings-container">
        <h2>Settings</h2>

        <form>
          {/* CATEGORIES */}
          <label htmlFor="category"> Choose category: </label>
          <select
            name="categories"
            id="category"
            onChange={(event) => handleCategoryChange(event)}
            value={category}
          >

            { categoryList.trivia_categories.map((categoryObject) => (
              <option key={nanoid()} value={categoryObject.name}>
                {' '}
                {categoryObject.name}
                {' '}
              </option>
            ))}
          </select>

          <hr />
          {/* DIFFICULTY LEVEL */}
          <label htmlFor="Easy">
            Easy
            <input
              type="radio"
              id="Easy"
              name="difficulty_level"
              value="easy"
              onChange={(event) => setDifficultyLevel(event.target.value)}
              checked={difficultyLevel === 'easy'}
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
              onChange={(event) => setDifficultyLevel(event.target.value)}
              checked={difficultyLevel === 'medium'}
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
              onChange={(event) => setDifficultyLevel(event.target.value)}
              checked={difficultyLevel === 'hard'}
            />
          </label>
          <br />
          <hr />
          {/* NUMBER OF QUESTIONS */}
          <label htmlFor="number_of_questions">
            Number of questions:&nbsp;
            <input
              type="number"
              id="number_of_questions"
              name="number_of_questions"
              min="1"
              max="6"
              value={questionsAmount}
              onChange={(event) => setQuestionsAmount(event.target.value)}
            />
          </label>
          <hr />
          {/* QUESTIONS TYPE */}
          <label htmlFor="true_false">
            True / False
            <input
              type="radio"
              id="true_false"
              name="questions_type"
              value="boolean"
              onChange={(event) => setQuestionsType(event.target.value)}
              checked={questionsType === 'boolean'}
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
              onChange={(event) => setQuestionsType(event.target.value)}
              checked={questionsType === 'multiple'}
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
              onChange={(event) => setQuestionsType(event.target.value)}
              checked={questionsType === ''}
            />
          </label>
          <br />
          <hr />
          <button className="button settings-button" type="button" onClick={() => handleClick()}>Confirm</button>

        </form>
      </div>
    </div>
  );
}
