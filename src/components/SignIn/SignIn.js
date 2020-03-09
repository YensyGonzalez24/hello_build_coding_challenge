import React, { Component } from 'react'
import style from './SignIn.module.scss'
import MainButton from '../General/MainButton/MainButton'
import TextField from '../General/TextField/TextField'
import {Link} from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

export class SignIn extends Component {

    constructor(props){
        super(props);

        this.state={
            buttonActive:false,
            emailText:'',
            passwordText:''
        }

        this.updateFields = this.updateFields.bind(this);

        this.singIn = this.singIn.bind(this)

    }

    updateFields = (value, s) =>{

        if(s === 0){

            this.setState({emailText:value})

        }else{

            this.setState({passwordText:value})

        }

    }

    componentDidUpdate(){

        if(this.state.emailText !== '' && this.state.passwordText !== ''){

            if(!this.state.buttonActive){

                this.setState({buttonActive:true})

            }

        }else{

            if(this.state.buttonActive){

                this.setState({buttonActive:false})

            }

        }

    }

    singIn = () =>{

        console.log('signing in')

        const users = JSON.parse(localStorage.getItem('users'))

        users.map((value, key)=>{
            
            if(value.email === this.state.emailText && value.password === this.state.passwordText){
                
                localStorage.setItem('userIsSignedIn', true)

                localStorage.setItem('activeUser', value.id)

                this.props.setUser(value)

                this.props.history.push("/Profile");

            }

            return null;
        })

    }

    render() {

        const auth = localStorage.getItem('userIsSignedIn')

        if(auth === 'true'){return <Redirect to={'/Profile'}/>}

        return (
            <div className={style.main}>
                <div className={style.panel}>
                    <h2>User Sign In</h2>
                    <div className={style.container}>
                        <TextField icon='far fa-envelope fa-lg' placeholder='Email' type='text' update={(value)=>{this.updateFields(value, 0)}}/>
                        <TextField icon='fas fa-lock fa-lg' placeholder='Password' type='password' update={(value)=>{this.updateFields(value, 1)}}/>
                    </div>
                    <MainButton label={'Sign In'} state={this.state.buttonActive} action={this.singIn}/>
                    <p className={style.link}>Don't Have an Account? <Link to='/CreateAccount'className={style.subLink}>Sign Up</Link></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{

    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setUser: (user)=>dispatch({type:'SET_USER', user})
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(SignIn)
