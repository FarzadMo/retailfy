
import { AUTHENTICATION } from './types';



export const userAuth = (authuser) => dispatch => {

    dispatch({
        type: AUTHENTICATION,
        payload: authuser
    })


}