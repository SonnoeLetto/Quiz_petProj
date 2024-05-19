import React, { Component } from 'react';
import classes from './Drawer.module.css';
import { Backdrop } from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';


export class Drawer extends Component {

    renderLinks(links) {
        return links.map((link, index) => (
            <li key={index}>
                <NavLink
                    to={link.to}
                    onClick={this.props.onClose}
                >
                    Link {link.label}
                </NavLink>
            </li>
        ))
    }
    render() {
        const cls = [classes.Drawer, !this.props.isOpen && classes.close]

        const links = [{
            to: '/',
            label: 'List',
            exact: true,
        }]

        if (this.props.isAuthenticated) {
            links.push({
                to: '/quiz-creator',
                label: 'Quiz creator',
                exact: false,
            })
            links.push({
                to: '/logout',
                label: 'Logout',
                exact: false,
            })
        } else {
            links.push({
                to: '/auth',
                label: 'Auth',
                exact: false,
            },)
        }
        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}

            </>

        )
    }
}