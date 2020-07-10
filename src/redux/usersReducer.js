import {usersAPI} from "../api/api";

const SET_ALL_USERS = "SET_ALL_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    isFetching: false,
    allUsers: []
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

export default usersReducer;