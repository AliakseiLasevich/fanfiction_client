import {usersAPI} from "../api/api";
import {getUserById} from "./usersReducer";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_JWT = "SET_JWT";
const SET_LOGGED = "SET_LOGGED";

let initialState = {
    logged: false,
    jwt: null,
    currentUser: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                logged: true
            };

        case LOGOUT:
            return initialState;

        case SET_JWT:
            return {
                ...state,
                jwt: action.jwt
            };

        case SET_LOGGED:
            return {
                ...state,
                logged: action.logged
            };

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            };


        default:
            return state;
    }
};

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
};


export const setJwt = (jwt) => {
    return {
        type: SET_JWT,
        jwt
    }
};

export const setLogged = (logged) => {
    return {
        type: SET_LOGGED,
        logged
    }
};

export const removeLocalStorageProps = () => {
    return (dispatch) => {
        localStorage.removeItem("userId");
        localStorage.removeItem("jwt");
    }
};

export const logoutAC = () => {
    return {
        type: LOGOUT
    }
};

export const login = (user) => {
    return (dispatch) => {
        if (user === undefined) {
            return;
        }
        usersAPI.login(user)
            .then(response => {
                    dispatch(getUserById(response.headers.userid, response.headers.authorization))
                        .then((user) => {
                                dispatch(authorizeUser(user.userId, response.headers.authorization))
                                localStorage.setItem("userId", response.headers.userid);
                                localStorage.setItem("jwt", response.headers.authorization);
                            }
                        );
                }
            )
    };
};

export const authorizeUser = (userId, jwt) => (dispatch) => {
    if (userId === undefined) {
        return;
    }
    let promise = dispatch(getUserById(userId, jwt));
    promise.then(user => {
        dispatch(setCurrentUser(user));
        dispatch(setJwt(jwt));
        dispatch(setLogged(true));
    })
};


export default authReducer;