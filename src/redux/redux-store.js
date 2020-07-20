import {applyMiddleware, combineReducers, createStore, compose} from "redux";
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

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.store = store;

export default store;