"use client";
import React, { useState } from "react";
import { quiz } from "../data.js";

const Page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [questions, setQuestions] = useState(
    quiz.questions.map((q) => ({ ...q, userAnswer: null }))
  );

  const { question, answers, correctAnswer } = questions[activeQuestion];

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  const handleHideAnswers = () => {
    setShowAnswers(false);
  };

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);

    setResult((prev) =>
      answer === correctAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    // Mettez à jour la réponse de l'utilisateur dans le tableau 'questions'
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[activeQuestion].userAnswer = answer;
      return updatedQuestions;
    });
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (checked) {
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        setActiveQuestion(0);
        setShowResult(true);
      }
    }
    setChecked(false);
  };

  return (
    <div className="container">
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{questions[activeQuestion].question}</h3>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                  selectedAnswerIndex === idx ? "li-selected" : "li-hover"
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className="btn">
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className="btn-disabled">
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-container">
            <h3>Results</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            {showAnswers && (
              <div>
                <ul>
                  {questions.map((q, index) => (
                    <li key={index}>
                      <strong>{q.question}</strong>
                      <br />
                      <br />
                      <strong>Correct Answer:</strong> {q.correctAnswer}
                      <br />
                      <br />
                      <span
                        style={{
                          color:
                            q.userAnswer === q.correctAnswer ? "green" : "red",
                        }}
                      >
                        <strong>Votre Reponse:</strong> {q.userAnswer}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {showResult && (
          <div>
            <button onClick={() => window.location.reload()}>Restart</button>
            <button
              onClick={showAnswers ? handleHideAnswers : handleShowAnswers}
            >
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
