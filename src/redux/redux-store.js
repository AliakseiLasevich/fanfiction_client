import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import artworkFormReducer from "./artworkFormReducer";
import artworkReducer from "./artworkReducer";



let reducers = combineReducers({
    authReducer: authReducer,
    usersReducer: usersReducer,
    artworkReducer: artworkReducer,
    artworkFormReducer: artworkFormReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;