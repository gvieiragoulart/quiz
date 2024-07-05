'use client';
import React,{useState} from "react";
import {quiz} from "../data.js";

const page = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const {questions} = quiz;
    const {question, answers, correctAnswer} = questions[activeQuestion];

    const onAnswerSelected = (answer:any, index:any) => {
        setSelectedAnswerIndex(index);
        setChecked(true);

        if(answer === correctAnswer) {
            setSelectedAnswer(true);
            console.log('correct');
        } else {
            setSelectedAnswer(false);
            console.log('wrong');
        }
    };

    const nextQuestion = () => {
        if(selectedAnswer) {
            setResult({
                ...result,
                score: result.score + 1,
                correctAnswers: result.correctAnswers + 1,
            });
        } else {
            setResult({
                ...result,
                wrongAnswers: result.wrongAnswers + 1,
            });
        }

        setSelectedAnswer(false);
        setChecked(false);
        setSelectedAnswerIndex(null);

        if(activeQuestion < questions.length - 1) {
            setActiveQuestion(activeQuestion + 1);
        } else {
            setShowResult(true);
        }
    }

    return (<div className="container">
        <h1>Quiz Page</h1>
        <div>
            <h2>
                Question: {activeQuestion + 1}<span>/{questions.length}</span>
            </h2>
        </div>

        <div>
            {
                !showResult ? (
                        <div className="quiz-container">
                            <h3>{questions[activeQuestion].question}</h3>
                            {answers.map((answer, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => onAnswerSelected(answer, index)}
                                    className={
                                        selectedAnswerIndex === index ? 'li-selected' : 'li-hover'
                                    }
                                >
                                    <span>{answer}</span>
                                </li>
                            ))}
                            {
                                checked ? 
                                (
                                    <button onClick={nextQuestion} className="btn">
                                        {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
                                    </button>
                                ) : (
                                    <button onClick={nextQuestion} disabled className="btn-disabled">
                                        {' '}
                                        {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
                                    </button>
                                )
                            }
                        </div>
                    ) : (
                        <div className="quiz-container">
                            <h3>Results</h3>
                            <h3>Overall {(result.score / questions.length) * 100}%</h3>
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
                            <button onClick={() => window.location.reload()}>Restart</button>
                        </div>
                    )
            }
        </div>
    </div>);
};

export default page;