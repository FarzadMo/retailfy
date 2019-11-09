import { USERINFO } from "../actions/types";
const initialState = {
    user: {
        userId: null,
        userName: ""
    }
}
export default function (state = initialState, action) {
    switch (action.type) {   /// gets the state and action and produce a new state
        case USERINFO:
            return {
                ...state,
                user: action.payload       // get the initialsate and produce a new one with action userAuth
            }
        default:
            return state;
    }
}