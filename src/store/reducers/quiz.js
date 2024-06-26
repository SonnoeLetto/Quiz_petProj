import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, RETRY_QUIZ } from "../actions/actionTypes";

const initialState = {
    quiz: null,
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: 'pending',

}

export const quizReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true,
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, answerState: 'pending', activeQuiestion: action.number
            }
        case RETRY_QUIZ:
            return {
                ...state, isFinished: false, activeQuestion: 0, answerState: 'pending', results: {}
            }
        default:
            return state;
    }
}