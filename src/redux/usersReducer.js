import {usersAPI} from "../api/api";

const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_ALL_USERS = "SET_ALL_USERS";

const LOGOUT = "LOGOUT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const LOGIN = "LOGIN";
const SET_USER_ID_AND_JWT = "SET_USER_ID_AND_JWT";
const SET_LOGGED = "SET_LOGGED";

let initialState = {
    logged: false,
    userID: null,
    isFetching: false,
    jwt: null,
    currentUser: {},
    allUsers: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            };

        case SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.allUsers
            };

        case LOGIN:
            return {
                ...state,
                logged: true
            };

        case LOGOUT:
            return {
                ...state, currentUser: {}
            };

        case SET_USER_ID_AND_JWT:

            return {
                ...state,
                userId: action.userId,
                jwt: action.jwt
            };

        case SET_LOGGED:
            return {
                ...state,
                logged: action.logged
            };

        default:
            return state;
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
};

export const setAllUsers = (allUsers) => {
    return {
        type: SET_ALL_USERS,
        allUsers
    }
};


export const setUserAndJWT = (userId, jwt) => {
    return {
        type: SET_USER_ID_AND_JWT,
        userId,
        jwt
    }
};

export const setLogged = (logged) => {
    return {
        type: SET_LOGGED,
        logged
    }
};

export const removeJwt = () => {
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
        usersAPI.login(user)
            .then(response => {
                    localStorage.setItem("userId", response.headers.userid);
                    localStorage.setItem("jwt", response.headers.authorization);
                    setUserAndJWT(response.headers.userid, response.headers.authorization);
                    dispatch(getUser(response.headers.userid, response.headers.authorization))
                    dispatch(setLogged(true));
                }
            )
    };
};

export const getUser = (userId, jwt) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUserById(userId, jwt)
            .then(response => {
                    dispatch(setIsFetching(false));
                    dispatch(setCurrentUser(response.data));
                }
            );
    };
};

export const getUsers = (jwt) => {
    return (dispatch) => {
        usersAPI.getUsers(jwt)
            .then(response =>{
                dispatch(setAllUsers(response.data));
            });
    }
}

export const postUser = (user) => {
    return (dispatch) => {
        usersAPI.postUser(user)
            .then(response => {
                    console.log(response);
                }
            );
    };
};


export default usersReducer;