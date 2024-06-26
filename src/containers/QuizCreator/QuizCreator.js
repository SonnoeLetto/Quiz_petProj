import React, { Component } from "react";
import classes from './QuizCreator.module.css';
import { Button } from "../../components/UI/Button/Button";
import { Input } from "../../components/UI/Input/Input";
import { Auxilary } from "../../hoc/Auxilary/Auxilary";
import { Select } from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import { createQuizQuestion, finishCreateQuiz } from "../../store/actions/create";

function validate(value, validation = null) {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    return isValid;
}
function validateForm(formControls) {

    let isFormValid = true;

    for (const control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid

        }
    }
    return isFormValid;
}
export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}
function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMsg: 'Значение не может быть пустым',
        id: number
    }, { required: true })
}
function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMsg: 'Вопрос не может быть пустым'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    submitHandler = (e) => {
        e.preventDefault()
    }

    addQuestionHandler = (e) => {
        e.preventDefault()

        const { question, option1, option2, option3, option4 } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = (e) => {
        e.preventDefault()

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })

        this.props.finishCreateQuiz()

    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.toched = true;
        control.value = value;

        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)

        })
    }
    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxilary key={index}>
                    <Input

                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.toched}
                        errorMsg={control.errorMsg}
                        onChange={(event) => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxilary>
            )
        })
    }
    selectChangeHandler = (e) => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }
    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>QuizCreator</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}
                        <Select
                            label='Choose right answer'
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                { text: '1', value: 1 },
                                { text: '2', value: 2 },
                                { text: '3', value: 3 },
                                { text: '4', value: 4 }
                            ]}
                        />
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add Question
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={!this.props.quiz === 0}

                        >
                            Create Question
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)