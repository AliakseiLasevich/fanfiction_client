import {emailVerificationApi, usersAPI} from "../api/api";
import {setCurrentUser, setJwt, setLogged} from "./authReducer";

const SET_ALL_USERS = "SET_ALL_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_EMAIL_VERIFY_RESULT = "SET_EMAIL_VERIFY_RESULT";

let initialState = {
    isFetching: false,
    allUsers: [],
    emailVerifyResult: {}
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };


        case SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.allUsers
            };

        case SET_EMAIL_VERIFY_RESULT:
            return {
                ...state,
                emailVerifyResult: action.emailVerifyResult
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


export const setAllUsers = (allUsers) => {
    return {
        type: SET_ALL_USERS,
        allUsers
    }
};

export const setEmailVerifyResult = (emailVerifyResult) => {
    return {
        type: SET_EMAIL_VERIFY_RESULT,
        emailVerifyResult
    }
};

export const getUserById = (userId, jwt) => (dispatch) => {
    return usersAPI.getUserById(userId, jwt)
        .then(response => {
                return response.data;
            }
        );
};


export const getUsers = (jwt) => (dispatch) => {
    usersAPI.getUsers(jwt)
        .then(response => {
            dispatch(setAllUsers(response.data));
        });
};


export const postUser = (user) => {
    return (dispatch) => {
        usersAPI.postUser(user)
            .then(response => {
                    // console.log(response);
                }
            );
    };
};

export const updateUserDetails = (user, jwt) => {
    return (dispatch) => {
        usersAPI.putUser(user, jwt)
            .then(response => {
                    // console.log(response);
                }
            );
    };
};

export const deleteUser = (userId, jwt) => {
    return (dispatch) => {
        usersAPI.deleteUser(userId, jwt)
            .then(response => {
                // console.log(response);
            })
    }
};

export const verifyEmailToken = (token) => {
    return (dispatch) => {
        emailVerificationApi.verify(token)
            .then(response => {
                dispatch(setEmailVerifyResult(response.data))
                }
            )
    }
};


export default usersReducer;