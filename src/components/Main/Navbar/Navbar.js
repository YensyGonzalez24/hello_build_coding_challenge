import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import style from './Navbar.module.scss'

export class Navbar extends Component {
    render() {
        return (
            <div className={style.main}>
                <Link className={style.button} to='/repositories'>
                    <i className="fab fa-github"></i>
                </Link>
                <Link className={style.button} to='/events'>
                    <i className="far fa-calendar-alt"></i>
                </Link>
                <Link className={style.button} to='/profile'>
                    <i className="fas fa-user"></i>
                </Link>
            </div>
        )
    }
}

export default Navbar
