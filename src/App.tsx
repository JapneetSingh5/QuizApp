import React, { useState } from 'react';
import { fetchQuizQuestions } from './API'
import QuestionCard from './components/QuestionCard'
//Typescript Types
import { QuestionState, Difficulty } from './API';
//Styles
import { GlobalStyle } from './App.styles';

export type AnswerObject = {
  question : string;
  answer : string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading ] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

  const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver){
        const answer = e.currentTarget.value;
        const correct = questions[number].correct_answer === answer;
        if(correct) setScore(prev => prev + 1);
        // Save answer in the userAnswers array
        const answerObject = {
          question: questions[number].question,
          answer, //es6 syntax
          correct,
          correctAnswer : questions[number].correct_answer
        }
        setUserAnswers(prev => [...prev, answerObject])
      }
  }

  const nextQuestion = () => {
      //MOve onto the next question, if it is not the last question
      const nextQuestion = number + 1;

      if(nextQuestion === TOTAL_QUESTIONS) {
        setGameOver(true);
      } else{
        setNumber(nextQuestion);
      }
  }

  return (
    <>
    <GlobalStyle />
    <div className="App">
      <h1>Science & Nature Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
      (
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      ) 
      : null}
      {!gameOver ? (<p className="score">Score: {score} </p>) : null}
      {loading ? <p> Loading Questions ... </p> : null}
      {!loading && !gameOver && (
        <QuestionCard 
        questionNr={number + 1}
        totalQuestions={10}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
      )
      : null
      }
    </div>
    </>
  );
}

export default App;
