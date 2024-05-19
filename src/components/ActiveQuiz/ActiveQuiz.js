import React from 'react';
import classes from './ActiveQuiz.module.css'
import { AnswersList } from './AnswersList/AnswersList';

export const ActiveQuiz = ({ answers = [], question, onAnswerClick, quizLength, answerNumber, state }) => {
    console.log(answers, 'insideActivequiz')
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{answerNumber}.</strong>
                    {question}
                </span>
                <small>{answerNumber} из {quizLength}</small>
            </p>

            <AnswersList answers={answers} onAnswerClick={onAnswerClick} state={state} />


        </div>
    )
}