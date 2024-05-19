import React, { Component } from "react";
import classes from './Quiz.module.css';
import { ActiveQuiz } from "../../components/ActiveQuiz/ActiveQuiz";
import { FinnishedQuiz } from "../../components/FinnishedQuiz/FinnishedQuiz";
import { Loader } from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizeById, retryQuiz } from "../../store/actions/quiz";
import { quizAnswerClick } from "../../store/actions/quiz";

class Quiz extends Component {
    componentDidMount() {
        const id = window.location.pathname.split('/').pop()

        this.props.fetchQuizeById(id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }
    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    {this.props.loading || !this.props.quiz ? (
                        <Loader />) : (
                        this.props.isFinished ? (
                            <FinnishedQuiz results={this.props.results} quiz={this.props.quiz} onRetry={this.props.retryQuiz} />
                        ) : (
                            <>
                                <h1 >Please answer questions</h1>
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion]?.answers}
                                    question={this.props.quiz[this.props.activeQuestion]?.question}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}

                                />
                            </>
                        )
                    )
                    }


                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizeById: (id) => dispatch(fetchQuizeById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)