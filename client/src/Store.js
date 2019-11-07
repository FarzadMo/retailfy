// we create store with createStore function
// createStore function takes three parameters: reducer (returns the next state tree,
// given the current state tree and action to handle), preloadstate (initialstate like a previously serialized user session), and enhancer (like redux chrome enhancer)

import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";


const initialState = {};
const middleware = [thunk];  // thunk is a middleware which allows us to directly access dispatch method
const store = createStore(rootReducer, initialState,
    // compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__()
    // )
    applyMiddleware(...middleware)
);

export default store;


