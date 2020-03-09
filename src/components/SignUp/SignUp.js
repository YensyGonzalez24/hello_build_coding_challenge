import React, { Component } from 'react'
import style from './SignUp.module.scss'
import TextField from '../General/TextField/TextField'
import MainButton from '../General/MainButton/MainButton'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {saveBasics} from '../../store/actions/signUpActions'
import { withRouter, Redirect } from 'react-router-dom'
// import GoogleAuth from '../../Auth/Google/googleAuth'

export class SignUp extends Component {

    constructor(props){
        super(props)

        this.state={
            passwordMatch:false,
            user:{
                name:'',
                email:'',
                password:''
            }
        }

    }

    render() {

        const auth = localStorage.getItem('userIsSignedIn')

        if(auth === 'true'){return <Redirect to={'/Profile'}/>}

        return (
            <div className={style.main}>
                <div className={style.panel}>
                    <MainPanel 
                        step={this.props.index} 
                        buttonActive={this.props.buttonActive} 
                        update={(value, index)=>this.updateFields(value, index)}
                        firstAction={()=>{
                            this.props.saveBasics(this.props.user)
                            this.props.history.push("/CreateAccount/Github");
                        }}
                    />
                </div>
                <div className={style.progressBar}>
                    <div className={style.outerBar}>
                        <div className={style.innerBar}>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    updateFields = (value, s) =>{

        switch(s){

            case 0:

                this.setState(
                        {user:{
                            ...this.state.user,
                            name:value
                        }}
                    )

                break;

            case 1:

                this.setState(
                    {user:{
                        ...this.state.user,
                        email:value
                    }}
                )

                break;

            case 2:

                this.setState(
                    {user:{
                        ...this.state.user,
                        password:value
                    }}
                )

                break;

            case 3:

                if(value===this.state.user.password){

                    this.setState(
                        {
                            passwordMatch:true
                        }
                    )

                }

                break;

            default:
                break;

        }

    }

    componentDidUpdate(){

        console.log(this.props.buttonActive)

        if(this.state.passwordMatch===true){

            if(this.state.user.name !== '' && this.state.user.email !== '' && this.props.set === false){

                const id = '_' + Math.random().toString(36).substr(2, 9);

                const data = {
                    id:id,
                    name:this.state.user.name,
                    email:this.state.user.email,
                    password:this.state.user.password
                }

                this.props.setBasics(data)

            }

        }

    }

    componentDidMount(){



    }    

}

const MainPanel = (props) =>{


    switch(props.step){

        case 0:
            return <MainForm 
                    buttonState={props.buttonActive} 
                    update={(value, index)=>props.update(value, index)} 
                    action={props.firstAction}/>

        case 1:
            return <GithubForm/>

        case 2:
            return <CalendarForm/>

        default:
            break;    

    }

}

const GithubForm = () =>{

    const query = window.location.search.substring(1)
    const token = query.split('access_token=')[1]

    console.log(token)

    if(token !== undefined){

        const id = localStorage.getItem('activeUser')

        let users = JSON.parse(localStorage.getItem('users'))

        users.map((value, key)=>{

            if(id === value.id){

                value.githubToken = token;

            }     

            return null;      

        })

        localStorage.setItem('users', JSON.stringify(users))

        return <Redirect to={'/CreateAccount/Google'}/>

    }else{

        return<div className={style.extSection}>
                    <h2 className={style.title}>Sign Into Github</h2>
                    <div className={style.subSec}>
                        <div className={style.button} onClick={()=>{
                            window.location.href = 'https://github.com/login/oauth/authorize?client_id=b778bba91a8eca85ea24'; 
                            return null;
                        }}>
                            <i className="fab fa-github-square"></i>
                            <h3> Sign In</h3>
                        </div>
                    </div>
                </div>
    
    }

}

const CalendarForm = () =>{


    return<div className={style.extSection}>
                <h2 className={style.title}>Sign Into Google</h2>
                <div className={style.subSec}>            
                    <div 
                    onClick={()=>{
                        console.log('google sign in')
                    }} 
                    className={style.button}
                    >
                        <i className="fab fa-google"></i>
                        <h3>Sign In</h3>
                    </div>
                </div>
            </div>
}

const MainForm = (props) =>{
    return <div className={style.mainForm}>
                <h2>Create Account</h2>
                <InputSection label='Name' icon='far fa-user fa-lg' type='text' index={(value)=>props.update(value, 0)}/>
                <InputSection label='Email' icon='far fa-envelope fa-lg'  type='email' index={(value)=>props.update(value, 1)}/>
                <InputSection label='Password' icon='fas fa-lock fa-lg' type='password' index={(value)=>props.update(value, 2)}/>
                <InputSection label='Confirm Password' icon='fas fa-lock fa-lg' type='password' index={(value)=>props.update(value, 3)}/>
                <MainButton label={'Continue'} state={props.buttonState} action={props.action}/>
            </div>
}

const InputSection = (props) =>{
    return <div className={style.section}>
                <h4 className={style.label}>{props.label}</h4>
                <TextField icon={props.icon} placeholder={props.label} type={props.type} update={(value)=>props.index(value)}/>
            </div>
}

const mapStateToProps = (state) =>{
    return{
        buttonActive:state.signUp.buttonActive,
        set:state.signUp.userSet,
        user:state.signUp.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setBasics: (data)=>dispatch({type:'SET_BASICS', data}),
        saveBasics: (user)=>dispatch(saveBasics(user))
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(SignUp)
