import {cloudinaryApi, usersAPI} from "../api/api";
import {getUserById} from "./usersReducer";
import {authorizeUser} from "./authReducer";

const ADD_CHAPTER = "ADD_CHAPTER";
const REMOVE_CHAPTER = "REMOVE_CHAPTER";
const ADD_IMAGE_URL = "ADD_IMAGE_URL";
const REMOVE_IMAGE = "REMOVE_IMAGE";
const ADD_TITLE = "ADD_TITLE";
const ADD_CONTENT = "ADD_CONTENT";
const RECALCULATE_CHAPTERS_INDEXES = "RECALCULATE_CHAPTERS_INDEXES";

const initialState = {
    chapters: [
        {
            index: 0,
            title: null,
            content: null,
            imgUrl: null
        }
    ]
};

const chapterReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_CHAPTER:
            const newChapter = {
                index: state.chapters.length,
                title: null,
                content: null,
                imgUrl: null
            };
            return {
                ...state, chapters: [...state.chapters, newChapter]
            };

        case REMOVE_CHAPTER:
            const filteredChapters = state.chapters.filter(chapter => chapter.index !== action.index);
            return {
                ...state, chapters: filteredChapters
            };

        case RECALCULATE_CHAPTERS_INDEXES:
            let chaptersCopy = JSON.parse(JSON.stringify([...state.chapters]));
            for (let i = 0; i < chaptersCopy.length; i++) {
                chaptersCopy[i].index = i;
            }
            return {
                ...state, chapters: chaptersCopy
            };

        case ADD_IMAGE_URL:
            let chapterToAddImageUrl = {...state.chapters[action.chapterIndex]};
            let editedChapter = {...chapterToAddImageUrl, imgUrl: action.imgUrl};
            return {
                ...state,
                chapters:
                    [...state.chapters.slice(0, action.chapterIndex),
                        editedChapter,
                        ...state.chapters.slice(action.chapterIndex + 1)]
            };

        case REMOVE_IMAGE:
            let chapterToRemoveImageUrl = {...state.chapters[action.chapterIndex]};
            chapterToRemoveImageUrl.imgUrl=null;
            return {
                ...state,
                chapters:
                    [...state.chapters.slice(0, action.chapterIndex),
                        chapterToRemoveImageUrl,
                        ...state.chapters.slice(action.chapterIndex + 1)]
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

        default:
            return state;
    }

};


export const addChapterAC = (chapter) => {
    return {
        type: ADD_CHAPTER, chapter
    }
};

export const removeChapterAC = (index) => {
    return {
        type: REMOVE_CHAPTER, index
    }
};

export const recalculateChaptersIndexes = () => {
    return {
        type: RECALCULATE_CHAPTERS_INDEXES
    }
};
export const removeChapterAndIndex = (index) => {
    return (dispatch) => {
        dispatch(removeChapterAC(index));
        dispatch(recalculateChaptersIndexes());
    };
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

export const addImageUrlAC = (chapterIndex, imgUrl) => {
    return {
        type: ADD_IMAGE_URL, chapterIndex, imgUrl
    }
};

export const removeImageAc = (chapterIndex) => {
    return {
        type: REMOVE_IMAGE, chapterIndex
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

export default chapterReducer;