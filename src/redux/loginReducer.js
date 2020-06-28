import {usersAPI} from "../api/api";

const LOGIN = "LOGIN";
const SET_USER_AND_TOKEN = "SET_USER_AND_TOKEN";
const SET_LOGGED = "SET_LOGGED";

let initialState = {
    logged: false,
    userID: null,
    token: null
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                user: action.user
            };

        case SET_USER_AND_TOKEN:
            return {
                ...state,
                userId: action.userId,
                token: action.token
            };

        case SET_LOGGED:
            return {
                ...state,
                logged: action.logged
            }

        default:
            return state;
    }
};


export const setUserAndToken = (userId, token) => {
    return {
        type: SET_USER_AND_TOKEN,
        userId,
        token
    }
};

export const setLogged = (logged) => {
    return {
        type: SET_LOGGED,
        logged: logged
    }
}

export const login = (user) => {
    return (dispatch) => {
        usersAPI.login(user)
            .then(response => {
                    setUserAndToken(response.headers.userid, response.headers.authorization)
                }
            )
    };
};

export default loginReducer;