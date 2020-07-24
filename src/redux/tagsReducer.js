import {tagAPI} from "../api/api";

const SET_TAGS = "SET_TAGS";

let initialState = {
    tags: []
};

const tagsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_TAGS:
            return {
                ...state, tags: action.tags
            };

        default:
            return state;
    }
};

export const setTags = (tags) => {
    return {
        type: SET_TAGS,
        tags
    }
};

export const requestCommonTags = () => async (dispatch) => {
    let response = await tagAPI.getCommonTags();
    if (response.status === 200) {
        dispatch(setTags(response.data.commonTags))
    }
};


export default tagsReducer;