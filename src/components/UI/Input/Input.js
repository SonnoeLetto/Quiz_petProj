import React from 'react';
import classes from './Input.module.css'


const isInvalid = (valid, touched, shouldValidate) => {
    return !valid && shouldValidate && touched
}

export const Input = ({ label, id, onChange, value, errorMsg, valid, touched, shouldValidate }) => {
    const cls = [classes.Input]
    if (isInvalid()) {
        cls.push(classes.invalid)
    }
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={id}>{label}</label>
            <input
                type='text'
                id={id}
                value={value}
                onChange={onChange}
            />
            {isInvalid(valid, touched, shouldValidate) && (

                <span>{errorMsg}</span>
            )}
        </div>
    );
}
