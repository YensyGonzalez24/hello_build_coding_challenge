import React, { Component } from 'react'
import style from './Calendar.module.scss'

export class Calendar extends Component {
    render() {
        return (
            <div className={style.main}>
                <h2 className={style.title}>Google Events</h2>
                <div className={style.list}>

                </div>
            </div>
        )
    }
}

export default Calendar
