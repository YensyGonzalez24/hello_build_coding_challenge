import React, { Component } from 'react'
import style from './TextField.module.scss'

export class TextField extends Component {

    constructor(props){
        super(props);

        this.state={
            empty:true
        }

        this.checkFull = this.checkFull.bind(this);

    }

    checkFull(e){

        const target = e.target;

        !target.value ? this.setState({empty : true}) : this.setState({empty : false});

    }

    render() {
        return (
            <div className={this.state.empty ? style.main : `${style.main} ${style.active}` }>
                <i className={this.props.icon}></i>
                <input 
                    type={this.props.type} 
                    placeholder={this.props.placeholder} 
                    onChange={(e)=>{this.props.update(e.target.value)}} 
                    onBlur={this.checkFull} 
                    onFocus={()=>{this.setState({empty : false})}}
                />
            </div>
        )
    }
}

export default TextField
