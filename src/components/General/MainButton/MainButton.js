import React, { Component } from 'react'
import style from './MainButton.module.scss'

export class MainButton extends Component {
    render() {
        return (
            <div className={this.props.state ? `${style.main} ${style.active}` : style.main} onClick={this.props.action}>
                <p className={style.label}>
                    {this.props.label}
                </p>
            </div>
        )
    }
}

export default MainButton
