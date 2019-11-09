
import { USERINFO } from './types';



export const userInformation = (userInfo) => dispatch => {

    dispatch({
        type: USERINFO,
        payload: userInfo
    })


}