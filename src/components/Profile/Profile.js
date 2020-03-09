import React, { Component } from 'react'
import MainButton from '../General/MainButton/MainButton'
import style from './Profile.module.scss'
import { compose } from 'redux'
import { connect } from 'react-redux'

export class Profile extends Component {

    constructor(props){
        super(props);

        this.state={
            user:{
                name:'',
                email:''
            }
        }

    }

    render() {
        return (
            <div className={style.main}>
                <h2 className={style.title}>
                    Profile
                </h2>
                <div className={style.picContainer}>
                    <span></span>
                </div>
                <div className={style.infoContainer}>
                    <h3 className={style.info}>
                        {this.state.user.name}
                     </h3>
                     <h3 className={style.info}>
                        {this.state.user.email}
                     </h3>
                     <h3 className={style.info}>
                        {}
                     </h3>
                </div>
                <div className={style.logOutContainer}>
                    <MainButton label='Sign Out' state={true} />
                </div>
            </div>
        )
    }

    componentDidMount(){

        const users = JSON.parse(localStorage.getItem('users'))

        const active = localStorage.getItem('activeUser')

        users.map((value, key)=>{
            
            if(value.id === active){
                
                this.setState({
                    user:{
                        name:value.name,
                        email:value.email
                    }
                })

            }

            return null;
        })

    }

}

const mapStateToProps = (state) =>{
    return{
        user:state.user.info
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {

    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Profile)
