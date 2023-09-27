import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import Question from "./Question";
import Alert from "./Alert";

export default function QuestionPage({ settings }) {
  const { difficultyLevel, categoryId, questionsAmount, questionsType } =
    settings;
  const [questions, setQuestions] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [spinner, setSpinner] = React.useState(true);
  const [sessionToken, setSessionToken] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [disableAnswersAlert, setDisableAnswersAlert] = React.useState(false);

  function decodeEntities(encodedString) {
    const textarea = document.createElement("textarea");
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
    const isAllChecked = questions.every(
      (question) => question.selectedAnswerIndex !== null
    );
    if (isAllChecked) {
      setCheck(true);
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
    const response = await fetch(
      "https://opentdb.com/api_token.php?command=request"
    );
    const data = await response.json();
    return data.token;
  }

  function fetchQuestions() {
    setCheck(false);
    fetch(
      `https://opentdb.com/api.php?
      token=${sessionToken}&
      amount=${questionsAmount}&
      ${questionsType ? `type=${questionsType}` : null}&
      ${categoryId ? `category=${categoryId}` : null}&
      ${difficultyLevel ? `difficulty=${difficultyLevel}` : null}`
    )
      .then((response) => response.json())
      .then((data) => {
        const questionsArr = [];
        for (let i = 0; i < data.results.length; i += 1) {
          const answers = [
            ...data.results[i].incorrect_answers,
            data.results[i].correct_answer,
          ];
          const decodeAnswers = answers.map((answer) => decodeEntities(answer));
          const { question } = data.results[i];
          const decodeQuestion = decodeEntities(question);
          let shuffledAnswers = [];
          if (data.results[i].type === "multiple") {
            shuffledAnswers = FisherYates(decodeAnswers);
          } else {
            shuffledAnswers[0] = "True";
            shuffledAnswers[1] = "False";
          }
          const questionObject = {
            type: data.results[i].type,
            questionIndex: i,
            question: decodeQuestion,
            selectedAnswerIndex: null,
            answers: shuffledAnswers,
            correctAnswerIndex: shuffledAnswers.indexOf(
              data.results[i].correct_answer
            ),
          };
          questionsArr.push(questionObject);
        }
        setQuestions(questionsArr);
        setSpinner(false);
      });
  }
  function newGame() {
    setSpinner(true);
    fetchQuestions();
    setCheck(false);
  }
  React.useEffect(() => {
    async function getSession() {
      const token = await getSessionToken();
      setSessionToken(token);
    }
    getSession();
  }, []);

  React.useEffect(() => {
    if (sessionToken) {
      fetchQuestions();
    }
  }, [sessionToken, settings]);

  return (
    <>
      <div className="questions-page-container">
        {disableAnswersAlert && (
          <Alert
            setAlert={setDisableAnswersAlert}
            alertText="you cannot change your answer after the game is over"
          />
        )}
        {spinner && <div className="spinner" />}
        {alert && (
          <Alert
            setAlert={setAlert}
            alertText="You must answer every question"
          />
        )}
        {spinner && <div className="spinner" />}

        {questions.length !== 0 &&
          !spinner &&
          questions.map((question) => (
            <Question
              key={nanoid()}
              question={question}
              setSelectedAnswerIndex={(questionIndex, answerIndex) =>
                setSelectedAnswerIndex(questionIndex, answerIndex)
              }
              check={check}
            />
          ))}
      </div>
      {check && (
        <div className="questions-page-score-container">
          <p className="questions-page-score-text">
            You scored&nbsp;
            {score}/{questionsAmount || 5} correct answers
          </p>
          <button
            className="questions-page-play-again-button questions-page-button"
            onClick={newGame}
            type="button"
          >
            Play again
          </button>
        </div>
      )}

      {!check && !spinner && (
        <button
          className="questions-page-check-answer-button questions-page-button"
          onClick={checkAnswers}
          type="button"
        >
          Check answers
        </button>
      )}
    </>
  );
}

QuestionPage.propTypes = {
  settings: PropTypes.shape({
    difficultyLevel: PropTypes.string,
    categoryId: PropTypes.number,
    questionsAmount: PropTypes.number,
    questionsType: PropTypes.string,
  }).isRequired,
};
