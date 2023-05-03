import React from 'react';
import { nanoid } from 'nanoid';
import Question from './Question';
import Alert from './Alert';

export default function QuestionPage(
  {
    difficultyLevel,
    category,
    questionsAmount,
    questionsType,
    categoryId,
  },
) {
  const [questions, setQuestions] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [spinner, setSpinner] = React.useState(true);
  const [sessionToken, setSessionToken] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const [disableAnswersAlert, setDisableAnswersAlert] = React.useState(false);
  // console.log('questionPageRender');
  function newGame() {
    // console.log('newGame');
    setSpinner(true);
    fetchQuestions();
    setCheck(false);
  }

  function decodeEntities(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  function FisherYates(array) {
    const randomArray = array;
    for (let i = randomArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    return randomArray;
  }

  function setSelectedAnswerIndex(questionIndex, answerIndex) {
    if (check) {
      setDisableAnswersAlert(true);

      return;
    }
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return { ...question, selectedAnswerIndex: answerIndex };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  }

  function checkAnswers() {
    // CHECK ONLY WHEN ALL ANSWERS WAS CHECKED
    // console.log('checkAnswers');
    const isAllChecked = questions.every((question) => question.selectedAnswerIndex !== null);
    if (isAllChecked) {
      setCheck(true);
      // console.log('all checked');
      // CALCULATE POINTS
      let points = 0;
      questions.forEach((question) => {
        if (question.correctAnswerIndex === question.selectedAnswerIndex) {
          points += 1;
        }
        setScore(points);
      });
    } else {
      setAlert(true);
    }
  }

  async function getSessionToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  }

  // function getSessionToken() {
  //   fetch('https://opentdb.com/api_token.php?command=request')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data.token;
  //     });
  // }

  function fetchQuestions() {
    setCheck(false);
    console.log(categoryId);
    fetch(
      `https://opentdb.com/api.php?
      token=${sessionToken}&
      amount=${questionsAmount || 5}&
      ${questionsType ? `type=${questionsType}` : null}&
      ${categoryId ? `category=${categoryId}` : null}&
      ${difficultyLevel ? `difficulty=${difficultyLevel}` : null}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const questionsArr = [];
        for (let i = 0; i < data.results.length; i += 1) {
          const answers = [...data.results[i].incorrect_answers, data.results[i].correct_answer];
          const decodeAnswers = answers.map((answer) => decodeEntities(answer));
          const { question } = data.results[i];
          const decodeQuestion = decodeEntities(question);
          let shuffledAnswers = [];
          if (data.results[i].type === 'multiple') {
            shuffledAnswers = FisherYates(decodeAnswers);
          } else {
            shuffledAnswers[0] = 'True';
            shuffledAnswers[1] = 'False';
          }
          const questionObject = {
            type: data.results[i].type,
            questionIndex: i,
            question: decodeQuestion,
            selectedAnswerIndex: null,
            answers: shuffledAnswers,
            correctAnswerIndex: shuffledAnswers.indexOf(
              data.results[i].correct_answer,
            ),
          };
          questionsArr.push(
            questionObject,
          );
        }
        setQuestions(questionsArr);
        setSpinner(false);
        // console.log('fetch');
      });
  }

  React.useEffect(() => {
    // console.log('initial useEffect');
    async function getSession() {
      const token = await getSessionToken();
      setSessionToken(token);
    }
    getSession();
  }, []);

  React.useEffect(() => {
    // console.log('sessionToken useEffect');
    if (sessionToken) {
      fetchQuestions();
    }
  }, [sessionToken, difficultyLevel, questionsAmount,
    questionsType,
    categoryId]);

  return (
    <>
      <div className="questionPage-container">
        {disableAnswersAlert && <Alert setAlert={setDisableAnswersAlert} alertText="you cannot change your answer after the game is over" />}
        {spinner && (
        <div className="spinner" />
        )}
        {alert && <Alert setAlert={setAlert} alertText="You must answer every question" />}
        {spinner && (
        <div className="spinner" />
        )}

        { questions.length !== 0 && !spinner
      && (

        questions.map((question) => (
          <Question
            key={nanoid()}
            question={question}
            setSelectedAnswerIndex={setSelectedAnswerIndex}
            check={check}
          />
        )))}

      </div>
      {check
          && (
            <div className="score-container">
              <p className="score-text">
                {' '}
                You scored&nbsp;
                {score}
                /
                {questionsAmount || 5}
                {' '}
                correct answers
              </p>
              <button className="play-again-button button" onClick={newGame} type="button">Play again</button>
            </div>
          )}

      {!check && !spinner && (
        <button className="check-answer-button button" onClick={checkAnswers} type="button">Check answers</button>
      )}

    </>
  );
}
