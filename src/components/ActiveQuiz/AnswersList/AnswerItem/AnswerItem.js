import classes from './AnswerItem.module.css'

export const AnswerItem = ({ answer, onAnswerClick, state }) => {

    const cls = [classes.AnswerItem]

    if (state !== 'pending') {
        cls.push(classes[state])
    }
    return (
        <li className={cls.join(' ')} onClick={() => onAnswerClick(answer.id)}>
            {answer.text}
        </li>
    )
}