import React from 'react';
import { nanoid } from 'nanoid';

export default function Question({
  check,
  setSelectedAnswerIndex,
  question: questionObject,
}) {
  if (!questionObject) return null;

  const {
    selectedAnswerIndex, question, questionIndex, type, answers, correctAnswerIndex,
  } = questionObject;

  // if (type === 'multiple') {
  //   const { answers, correctAnswerIndex } = questionObject;
  // }

  // if (type === 'boolean') {
  //   const { answer } = questionObject;
  // }

  return (
    <div className='question-container'>
      <h2 className="question-text">{question}</h2>
      <div className='question-answers'>
        {answers.map((answer, answerIndex) => {
          let className = 'answer-button ';
          // COLOR CHECKED ANSWER
          if (!check && selectedAnswerIndex === answerIndex) {
            className += 'checked-answer';
          }
          // COLOR GOOD ANSWER
          if (check && answerIndex === correctAnswerIndex) {
            className += 'good-answer';
          }
          // COLOR BAD ANSER (IF CHECKED)
          if (check && selectedAnswerIndex === answerIndex
            && selectedAnswerIndex !== correctAnswerIndex) {
            className += 'wrong-answer';
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
      <hr className='question-horizontal-line'/>
    </div>
  );
}
