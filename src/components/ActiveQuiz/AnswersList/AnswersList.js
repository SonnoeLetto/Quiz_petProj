import React from "react";
import classes from './AnswersList.module.css';
import { AnswerItem } from "./AnswerItem/AnswerItem";


export const AnswersList = ({ answers, onAnswerClick, state }) => (
    <ul className={classes.AnswersList}>
        {answers.map((answer, index) => (
            <AnswerItem
                answer={answer}
                key={answer.id}
                onAnswerClick={onAnswerClick}
                state={state[answer.id]}
            />
        ))}
    </ul>
)