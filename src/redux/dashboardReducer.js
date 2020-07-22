import {artworkAPI, artworkPreviewAPI} from "../api/api";

const SET_USER_ARTWORKS = "SET_USER_ARTWORKS";


let initialState = {
        artworks: []
};

const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_ARTWORKS:
            return {
                ...state, artworks: action.artworks
            };

        default:
            return state;
    }
};


export const setUserArtworks = (artworks) => {
    return {
        type: SET_USER_ARTWORKS,
        artworks
    }
};

export const getArtworks = (userId) => {
    return (dispatch) => {
        artworkPreviewAPI.getArtworksByUser(userId)
            .then(response => {
              dispatch(setUserArtworks(response.data.artworksPreviews));

            })
    }

};


export default dashboardReducer;