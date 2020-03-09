import React, { Component } from 'react'
import style from './Repo.module.scss'
import { compose } from 'redux'
import { connect } from 'react-redux'

export class Repo extends Component {

    constructor(props){
        super(props);

        this.state={
            repos:[]
        }

    }

    render() {

        console.log(this.state.repos)

        this.cards=this.state.repos.map((value,key)=>{
            return<RepoCard
                id={value.id}
                name={value.name}
                owner={value.owner.login}
            />

        })

        return (
            <div className={style.main}>
                <h2 className={style.title}>Github Repositories</h2>
                <div className={style.list}>
                    {this.cards}
                </div>
            </div>
        )
    }

    componentWillMount(){
        
        const query = window.location.search.substring(1)

        const token = query.split('access_token=')[1]

        console.log(token)

        if(token===undefined){

            window.location.href = 'https://github.com/login/oauth/authorize?client_id=b778bba91a8eca85ea24'; 

        }else{

            fetch('https://api.github.com/user', {
                headers: {
                    // Include the token in the Authorization header
                    Authorization: 'token ' + token
                }
            })
            // Parse the response as JSON
            .then(res => res.json())
            .then(res => {

                console.log(res.repos_url)

                fetch(res.repos_url, {
                    headers: {
                        // Include the token in the Authorization header
                        Authorization: 'token ' + token
                    }
                }).then(res => res.json())
                .then(res => {

                    console.log(res)

                    this.setState({repos:res})

                })


            })
        
        }

    }
}

const RepoCard = (props) =>{

    return<div className={style.listItem}>
                <div className={style.itemSection}>
                    <h4>
                        Name
                    </h4>
                    <h4>
                        {props.name}
                    </h4>
                </div>
                <div className={style.itemSection}>
                    <h3>
                        ID
                    </h3>
                    <h3>
                        {props.id}
                    </h3>
                </div>
                <div className={style.itemSection}>
                    <h3>
                        Owner
                    </h3>
                    <h3>
                        {props.owner}
                    </h3>
                </div>
            </div>

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
)(Repo)
