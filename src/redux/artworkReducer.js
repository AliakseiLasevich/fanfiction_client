import {artworkAPI, likeApi} from "../api/api";

const SET_ARTWORKS_PREVIEWS = "SET_ARTWORKS_PREVIEWS";
const SET_USER_LIKES = "SET_USER_LIKES";
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
        userRating: null,
        userLikes: null
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

        case SET_USER_LIKES:
            return {
                ...state,
                currentArtwork: {
                    ...state.currentArtwork,
                    userLikes: action.userLikes
                }
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

export const resetCurrentArtworkStateThunk = () => {
    return (dispatch) => {
        dispatch(resetCurrentArtworkState())
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
};

export const deleteArtworkByIdAC = (artworkId, userId) => {
    return (dispatch) => {
        artworkAPI.deleteArtwork(artworkId)
            .then(response => {
                dispatch(getArtworksPreviewsByUserId(userId))
            })
    }
};

export const setUserLikes = (userLikes) => {
    return {
        type: SET_USER_LIKES,
        userLikes
    }
};
export const postLike = (userId, artworkId, chapterNumber) => {
    const like = {like: true}
    return (dispatch) => {
        likeApi.postLike(userId, artworkId, chapterNumber, like)
            .then(response => {
                console.log(response.data);
                dispatch(getUserLikes(userId, artworkId));
            })
    }
};

export const getUserLikes = (userId, artworkId) => {
    return (dispatch) => {
        likeApi.getLike(userId, artworkId)
            .then(response => {
                dispatch(setUserLikes(response.data))
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