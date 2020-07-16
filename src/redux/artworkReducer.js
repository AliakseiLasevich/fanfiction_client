import {artworkAPI} from "../api/api";

const SET_ARTWORKS_PREVIEWS = "SET_ARTWORKS_PREVIEWS";
const SET_PAGES_COUNT = "SET_PAGES_COUNT";
const SET_CURRENT_ARTWORK = "SET_CURRENT_ARTWORK";
const RESET_STATE = "RESET_STATE";

let initialState = {
    artworksPreviews: [],
    pagesCount: 0,
    currentArtwork: {
        genre: "",
        chapters: "",
        averageRating: 0,
        userRating: null
    }
};

const artworkReducer = (state = initialState, action) => {

    switch (action.type) {

        case RESET_STATE:
            return initialState;

        case SET_ARTWORKS_PREVIEWS:
            return {
                ...state, artworksPreviews: action.artworksPreviews
            };

        case SET_PAGES_COUNT:
            return {
                ...state, pagesCount: action.pagesCount
            };

        case SET_CURRENT_ARTWORK:
            return {
                ...state, currentArtwork: action.currentArtwork
            };

        default:
            return state;
    }
};

export const setArtworksPreviews = (artworksPreviews) => {
    return {
        type: SET_ARTWORKS_PREVIEWS,
        artworksPreviews
    }
};

export const setPagesCount = (pagesCount) => {
    return {
        type: SET_PAGES_COUNT,
        pagesCount
    }
};

export const resetCurrentArtworkState = () => {
    return {
        type: RESET_STATE
    }
};

export const setCurrentArtwork = (currentArtwork) => {
    return {
        type: SET_CURRENT_ARTWORK,
        currentArtwork
    }
};

export const getArtworkById = (artworkId) => {
    return (dispatch) => {
        artworkAPI.getArtworkById(artworkId)
            .then(response => {
                dispatch(setCurrentArtwork(response.data))
            })
    }
}

export const getArtworksPreviews = (page) => {
    return (dispatch) => {
        artworkAPI.getArtworksPreviews(page)
            .then(response => {
                dispatch(setArtworksPreviews(response.data.artworksPreviews));
                dispatch(setPagesCount(response.data.pagesCount));
            })
    }
};

export const getArtworksPreviewsByUserId = (userId) => {
    return (dispatch) => {
        artworkAPI.getArtworksByUser(userId)
            .then(response => {
                dispatch(setArtworksPreviews(response.data.artworksPreviews));
                dispatch(setPagesCount(response.data.pagesCount));
            });
    }
};

export const getArtworksPreviewsBySearch = (textToSearch) => {
    return (dispatch) => {
        artworkAPI.getArtworksPreviewsBySearch(textToSearch)
            .then(response => {
                dispatch(setArtworksPreviews(response.data));
            })
    }
};


export default artworkReducer;