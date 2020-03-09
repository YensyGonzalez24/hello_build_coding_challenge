export const saveBasics = (user) =>{
    return(dispatch, getState) => {

        let users = JSON.parse(localStorage.getItem('users'))

        let newUsers = []

        if(users !== null){

            newUsers = [
                ...users, 
                user
            ]

        }else{

            newUsers = [
                user
            ]

        }

        localStorage.setItem('users', JSON.stringify(newUsers))

        localStorage.setItem('activeUser', user.id)
        
        dispatch({type:'STEP_UP'})


    }
}