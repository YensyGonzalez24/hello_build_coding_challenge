import signUpReducer from './signUpReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    signUp: signUpReducer,
    user:userReducer
})

export default rootReducer