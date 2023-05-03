import React from "react";

//  onClick={() => handleClick}
// correctAnswer={correctAnswer}
// answers={ranAnswers[0]}
// checkedAnswer={checkedAnswer}
export default AnswerButton( {onClick, correctAnswer, answers, checkedAnswer}) {
  
  return(
    <button onClick={onClick}  type="button">{answers}</button>
  )
}