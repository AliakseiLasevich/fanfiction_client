import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import artworkFormReducer from "./artworkFormReducer";
import artworkReducer from "./artworkReducer";
import dashboardReducer from "./dashboardReducer";



let reducers = combineReducers({
    authReducer: authReducer,
    usersReducer: usersReducer,
    artworkReducer: artworkReducer,
    artworkFormReducer: artworkFormReducer,
    dashboardReducer: dashboardReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;