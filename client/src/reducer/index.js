import { combineReducers } from "redux";

// import postReducer from './postReducer';
import authReducer from './authReducer'
import userReducer from './userReducer'


export default combineReducers({
    auth: authReducer,
    user: userReducer
})


