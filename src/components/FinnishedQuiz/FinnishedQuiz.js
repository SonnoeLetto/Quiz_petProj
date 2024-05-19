import React from "react";
import classes from "./FinnishedQuiz.module.css"
import { Button } from "../UI/Button/Button";
import { Link } from "react-router-dom";

export const FinnishedQuiz = ({ results, quiz, onRetry }) => {
    console.log(results, 'results')
    const successCount = Object.keys(results).reduce((total, key) => {
        console.log(Object.keys(results))
        if (results[key] === 'success') {
            console.log('Im here')
            total++
        }

        return total
    }, 0)

    return (<div className={classes.FinnishedQuiz}>
        <ul>
            {quiz.map((quizItem, index) => (
                <li key={index}>
                    <strong>{index + 1}</strong>.&nbsp;
                    {quizItem.question}&nbsp;
                    <i>{results[quizItem.id] === 'success' ? '- ok' : '- wrong'}</i>
                </li>
            ))}

        </ul>
        <p>Right {successCount} from {quiz.length}</p>
        <Button onClick={onRetry} type='primary'>
            Retry
        </Button>
        <Link to='/'>
            <Button type='success'>
                go to list
            </Button>
        </Link>

    </div>)
}