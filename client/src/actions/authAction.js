// import { FETCH_POSTS, NEW_POST } from '../actions/types';
import { AUTHENTICATION } from './types';

// export const fetchPosts = () => distpatch => {

//     Axios.get().then(res => distpatch({
//         type: FETCH_POSTS,
//         payload: res.data
//     })
//     );

// }


export const userAuth = (authuser) => dispatch => {

    dispatch({
        type: AUTHENTICATION,
        payload: authuser
    })


}