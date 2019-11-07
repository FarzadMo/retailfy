import { AUTHENTICATION } from "../actions/types";

const initialState = {

    authitem: false

}


export default function (state = initialState, action) {
    switch (action.type) {   /// gets the state and action and produce a new state
        case AUTHENTICATION:
            return {
                ...state,
                authitem: action.payload       // get the initialsate and produce a new one with action userAuth
            }
        default:
            return state;
    }
}