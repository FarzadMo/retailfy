import { AUTHENTICATION } from "../actions/types";

// for actions we create types, they are constants

// bring in types form action folder, types.js

// import { FETCH_POSTS, NEW_POST } from '../actions/types';

// reducer takes state and action

// const initialState = {

//     items: [],  // posts comes form api
//     item: {}    // it reperesent the single item that we post

// }
const initialState = {

   authitem:false

}


// export default function (state = initialState, action) {
//     switch (action.type) {   /// gets the state and action and produce a new state
// case FETCH_POSTS :
//     return {
//         ...state,
//         items: action.payload       // get the initialsate and produce a new one with action Fetch-post
//     }
//     }
// }

export default function (state = initialState, action) {
    switch (action.type) {   /// gets the state and action and produce a new state
case AUTHENTICATION  :
    return {
        ...state,
        authitem: action.payload       // get the initialsate and produce a new one with action userAuth
    }
    default:
        return state;
    }
}