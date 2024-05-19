import React from "react";
import classes from "./Button.module.css";

export const Button = ({ children, onClick, type = 'primary', className, ...arg }) => {
    const cls = [
        classes.Button,
        classes[type],
        className
    ]

    return (
        <button
            className={cls.join(' ')}
            onClick={onClick}
            {...arg}
        >
            {children}
        </button>
    );
}
