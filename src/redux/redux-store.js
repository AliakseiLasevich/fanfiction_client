import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import loginReducer from "./loginReducer";
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
    usersReducer: usersReducer,
    loginReducer: loginReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;