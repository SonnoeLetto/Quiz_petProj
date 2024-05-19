import React from 'react';
import classes from './MenuToggle.module.css';

export const MenuToggle = ({ onToggle, isOpen }) => {
    const cls = [classes.MenuToggle, isOpen && classes.active]
    return (<i className={cls.join(' ')} onClick={onToggle}>{isOpen ? 'close' : 'open'}</i>);
}
