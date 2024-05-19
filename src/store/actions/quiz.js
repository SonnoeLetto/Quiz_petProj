import axios from "../../axios/axios-quiz";
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RETRY_QUIZ } from "./actionTypes";

export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')

            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Number ${index + 1}`
                })
            })
            console.log(response, 'qdqd')
            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            dispatch(fetchQuizesError(error))

        }
    }
}
export const fetchQuizeById = (quizId) => {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {

            const response = await axios.get(`/quizes/${quizId}.json`)
            dispatch(fetchQuizSuccess(response.data))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}
const fetchQuizSuccess = (quiz) => {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}
const fetchQuizesStart = () => {
    return {
        type: FETCH_QUIZES_START
    }
}

const fetchQuizesSuccess = (quizes) => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}
const fetchQuizesError = (erorr) => {
    return {
        type: FETCH_QUIZES_ERROR,
        erorr
    }
}
const quizSetState = (answerState, results ) => {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}
const finnishQuiz = () => {
    return {
        type: FINISH_QUIZ,
    }
}
const quizNextQuizstion = (questionNumber) => {
    return {
        type: QUIZ_NEXT_QUESTION,
        number: questionNumber
    }
}

export const retryQuiz = () => {
    return  {
        type: RETRY_QUIZ
    }
}
export const quizAnswerClick = (answerId) => {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') return
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({ [answerId]: 'success' }, results))

            const timeout = window.setTimeout(() => {

                if (isQuizFinished(state)) {
                    dispatch(finnishQuiz())
                } else {
                    dispatch(quizNextQuizstion(state.activeQuestion))
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1, answerState: 'pending'
                    // },)
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({ [answerId]: 'error' }, results))
        }
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}