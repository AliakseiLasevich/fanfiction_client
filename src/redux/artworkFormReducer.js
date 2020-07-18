import {artworkAPI, cloudinaryApi} from "../api/api";

const SET_ARTWORK_TO_EDIT = "SET_ARTWORK_TO_EDIT";
const SET_ARTWORK_NAME = "SET_ARTWORK_NAME";
const SET_TAGS = "SET_TAGS";
const RESET_STATE = "RESET_STATE";
const ADD_CHAPTER = "ADD_CHAPTER";
const SET_CHAPTERS = "SET_CHAPTERS";
const REMOVE_CHAPTER = "REMOVE_CHAPTER";
const ADD_IMAGE_URL = "ADD_IMAGE_URL";
const REMOVE_CHAPTER_IMAGE = "REMOVE_CHAPTER_IMAGE";
const ADD_TITLE = "ADD_TITLE";
const ADD_CONTENT = "ADD_CONTENT";
const SET_GENRES = "SET_GENRES";
const RECALCULATE_CHAPTERS_INDEXES = "RECALCULATE_CHAPTERS_INDEXES";
const SET_SUBMITTED_ARTWORK_ID = "SET_SUBMITTED_ARTWORK_ID";

const initialState = {
    artworkToEdit: null,
    name: "",
    chapters: [
        {
            chapterNumber: 0,
            index: 0,
            title: "",
            content: "",
            tags: [],
            genres: [],
            imageUrl: ""
        }
    ],
    submittedId: false
};

const artworkFormReducer = (state = initialState, action) => {
    switch (action.type) {

        case RESET_STATE:
            return initialState;

        case SET_ARTWORK_TO_EDIT:
            return {...state, artworkToEdit: action.artwork}

        case SET_ARTWORK_NAME:
            return {...state, name: action.name}

        case ADD_CHAPTER:
            const newChapter = {
                index: state.chapters.length,
                chapterNumber: state.chapters.length,
                title: "",
                content: "",
                imageUrl: ""
            };
            return {
                ...state, chapters: [...state.chapters, newChapter]
            };

        case SET_CHAPTERS:
            return {
                ...state, chapters: action.chapters
            };

        case REMOVE_CHAPTER:
            const filteredChapters = state.chapters.filter(chapter => chapter.index !== action.index);
            return {
                ...state, chapters: filteredChapters
            };

        case RECALCULATE_CHAPTERS_INDEXES:
            let chaptersCopy = JSON.parse(JSON.stringify(state.chapters));
            for (let i = 0; i < chaptersCopy.length; i++) {
                chaptersCopy[i].chapterNumber = i;
                chaptersCopy[i].index = i;
            }
            return {
                ...state, chapters: chaptersCopy
            };

        case ADD_TITLE:
            let toEdit = state.chapters[action.chapterIndex];
            let edited = {...toEdit, title: action.title};
            return {
                ...state,
                chapters:
                    [...state.chapters.slice(0, action.chapterIndex),
                        edited,
                        ...state.chapters.slice(action.chapterIndex + 1)]
            };

        case ADD_CONTENT:
            let toAddContent = state.chapters[action.chapterIndex];
            let withContent = {...toAddContent, content: action.content};
            return {
                ...state,
                chapters:
                    [...state.chapters.slice(0, action.chapterIndex),
                        withContent,
                        ...state.chapters.slice(action.chapterIndex + 1)]
            };

        case ADD_IMAGE_URL:
            let chapterToAddImageUrl = {...state.chapters[action.chapterIndex]};
            let editedChapter = {...chapterToAddImageUrl, imageUrl: action.imageUrl};
            return {
                ...state,
                chapters:
                    [...state.chapters.slice(0, action.chapterIndex),
                        editedChapter,
                        ...state.chapters.slice(action.chapterIndex + 1)]
            };

        case REMOVE_CHAPTER_IMAGE:
            let chapterToRemoveImageUrl = {...state.chapters[action.chapterIndex]};
            chapterToRemoveImageUrl.imageUrl = null;
            return {
                ...state,
                chapters:
                    [...state.chapters.slice(0, action.chapterIndex),
                        chapterToRemoveImageUrl,
                        ...state.chapters.slice(action.chapterIndex + 1)]
            };


        case SET_TAGS:
            return {
                ...state, tags: action.tags
            };

        case SET_GENRES:
            return {
                ...state, genres: action.genres
            };

        case SET_SUBMITTED_ARTWORK_ID:
            return {
                ...state, submittedId: action.submittedId
            };


        default:
            return state;
    }

};

export const requestArtworkToEdit = (artworkId) => {
    return (dispatch) => {
        artworkAPI.getArtworkById(artworkId)
            .then(response => dispatch(setArtworkToEdit(response.data)));
    };
};

export const setArtworkToEdit = (artwork) => {
    return {
        type: SET_ARTWORK_TO_EDIT,
        artwork
    }
};
export const setArtworkName = (name) => {
    return {
        type: SET_ARTWORK_NAME,
        name
    }
};

export const removeChapterAndIndex = (index) => {
    return (dispatch) => {
        dispatch(removeChapterAC(index));
        dispatch(recalculateChaptersIndexes());
    };
};

export const resetArtworkFormState = () => {
    return {
        type: RESET_STATE
    }
};

export const addChapterAC = (chapter) => {
    return {
        type: ADD_CHAPTER, chapter
    }
};

export const setTags = (tags) => {
    return {
        type: SET_TAGS, tags
    }
};

export const setGenres = (genres) => {
    return {
        type: SET_GENRES, genres
    }
};

export const removeChapterAC = (index) => {
    return {
        type: REMOVE_CHAPTER, index
    }
};

export const setChaptersAC = (chapters) => {
    return {
        type: SET_CHAPTERS, chapters
    }
};

export const recalculateChaptersIndexes = () => {
    return {
        type: RECALCULATE_CHAPTERS_INDEXES
    }
};


export const addTitleAC = (chapterIndex, title) => {
    return {
        type: ADD_TITLE, title, chapterIndex
    }
};

export const addContentAC = (chapterIndex, content) => {
    return {
        type: ADD_CONTENT, content, chapterIndex
    }
};

export const addImageUrlAC = (chapterIndex, imageUrl) => {
    return {
        type: ADD_IMAGE_URL, chapterIndex, imageUrl
    }
};

export const removeImageAc = (chapterIndex) => {
    return {
        type: REMOVE_CHAPTER_IMAGE, chapterIndex
    }
};

export const setSubmittedId = (submittedId) => {
    return {
        type: SET_SUBMITTED_ARTWORK_ID, submittedId
    }
};

export const uploadImageToChapter = (files, index) => {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'fanfic');
    return (dispatch) => {
        cloudinaryApi.upload(data)
            .then(response => {
                dispatch(addImageUrlAC(index, response.data.secure_url))
            });
    };
};

export const submitArtwork = (artwork) => {
    return (dispatch) => {
        artworkAPI.postArtwork(artwork)
            .then(response => dispatch(setSubmittedId(response.data.artworkId)));
    };

};

export const requestTags = () => {
    return (dispatch) => {
        artworkAPI.getTags()
            .then(response => {
                dispatch(setTags(response.data))
            });
    };
};

export const requestGenres = () => {
    return (dispatch) => {
        artworkAPI.getGenres()
            .then(response => {
                dispatch(setGenres(response.data))
            });
    };
};

export default artworkFormReducer;