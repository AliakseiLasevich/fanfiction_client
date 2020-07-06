import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import chapterReducer from "./chapterReducer";



let reducers = combineReducers({
    authReducer: authReducer,
    usersReducer: usersReducer,
    chapterReducer: chapterReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;