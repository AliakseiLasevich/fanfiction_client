import {usersAPI} from "../api/api";

const SET_USERS = "SET_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    users: [],
    isFetching: true,
    jwt: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS:
            return {
                ...state,
                users: action.users
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };

        default:
            return state;
    }
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        allSpecialties: users.data
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};

export const getUsers = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers()
            .then(response => {
                    dispatch(setUsers(response));
                    dispatch(setIsFetching(false));
                }
            );
    };
};

// export const postSpecialty = (specialty) => {
//     return (dispatch) => {
//         specialtyAPI.postSpecialty(specialty)
//             .then(response => {
//                     dispatch(getSpecialties());
//                 }
//             )
//     };
// };
//
// export const putSpecialty = (specialty) => {
//     return (dispatch) => {
//         specialtyAPI.putSpecialty(specialty)
//             .then(response => {
//                     dispatch(getSpecialties());
//                 }
//             )
//     };
// };

export default usersReducer;