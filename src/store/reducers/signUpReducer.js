const initState = {
    buttonActive:false,
    user:{
        id:'',
        name:'',
        email:'',
        password:'',
        githubToken:'',
        googleToken:''
    }, 
    userSet:false,
    step:0
}

const signUpReducer = (state = initState, action) =>{

    switch (action.type) {
        case 'SET_BASICS':
            return {
                ...state,
                user:{
                    ...state.user,
                    id:action.data.id,
                    name:action.data.name,
                    email:action.data.email,
                    password:action.data.password
                },
                buttonActive:true,
                userSet:true
            }

            case 'STEP_UP':
                return {
                    ...state
                }
    
        default:
            return state
    }
}

export default signUpReducer;