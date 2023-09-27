import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

export default function Question({
  check,
  setSelectedAnswerIndex,
  question: questionObject,
}) {
  if (!questionObject) return null;
  const {
    selectedAnswerIndex,
    question,
    questionIndex,
    answers,
    correctAnswerIndex,
  } = questionObject;

  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      <div className="question-answers">
        {answers.map((answer, answerIndex) => {
          let className = "question-answer-button ";
          // COLOR CHECKED ANSWER
          if (!check && selectedAnswerIndex === answerIndex) {
            className += "question-checked-answer";
          }
          // COLOR GOOD ANSWER
          if (check && answerIndex === correctAnswerIndex) {
            className += "question-good-answer";
          }
          // COLOR BAD ANSER (IF CHECKED)
          if (
            check &&
            selectedAnswerIndex === answerIndex &&
            selectedAnswerIndex !== correctAnswerIndex
          ) {
            className += "question-wrong-answer";
          }
          return (
            <button
              key={nanoid()}
              type="button"
              className={className}
              onClick={() => setSelectedAnswerIndex(questionIndex, answerIndex)}
            >
              {answer}
            </button>
          );
        })}
      </div>
      <hr className="question-horizontal-line" />
    </div>
  );
}

Question.propTypes = {
  check: PropTypes.bool.isRequired,
  setSelectedAnswerIndex: PropTypes.func.isRequired,
  question: PropTypes.shape({
    selectedAnswerIndex: PropTypes.number,
    question: PropTypes.string,
    questionIndex: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.string),
    correctAnswerIndex: PropTypes.number,
  }).isRequired,
};
