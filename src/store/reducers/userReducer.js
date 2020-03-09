const initState = {
    info:{
        id:'',
        name:'',
        email:'',
        password:'',
        githubToken:'',
        googleToken:''
    }, 
    repoList:[],
}

const userReducer = (state = initState, action) =>{

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                info:action.user
            }
    
        default:
            return state
    }
}

export default userReducer;