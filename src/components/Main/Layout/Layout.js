import React, { Component } from 'react'
import style from './Layout.module.scss'
import Navbar from '../Navbar/Navbar'
import Repo from '../../Repo/Repo'
import Calendar from '../../Calendar/Calendar'
import Profile from '../../Profile/Profile'
import { Redirect } from 'react-router-dom'


export class Layout extends Component {
    render() {

        const auth = localStorage.getItem('userIsSignedIn')

        if(auth !== 'true'){return <Redirect to={'/SignIn'}/>}

        const screen = window.innerWidth

        if(screen<1000){

            return (
                <div className={style.main}>
                    <div className={style.subMain}>
                        {this.props.interface}
                    </div>
                    <Navbar/>
                </div>
            )


        }else{

            return (
                <div className={style.main}>
                    <Repo/>
                    <Calendar/>
                    <Profile/>
                </div>
            )

        }
    }

    componentWillMount(){



    }

}

export default Layout
