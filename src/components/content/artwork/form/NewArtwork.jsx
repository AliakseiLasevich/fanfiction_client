import * as React from "react";
import {useReducer} from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useForm} from "react-hook-form";
import TagManager from "./TagManager";
import NewChapter from "./NewChapter";


const NewArtwork = (props) => {

    //TODO request all tags from server
    const allTags = [
        {tag: "The Shawshank Redemption"},
        {tag: "The Godfather"},
        {tag: "The Godfather: Part II"},
        {tag: "The Dark Knight"},
    ];

    const [tags, setTags] = React.useState([]);

    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (artwork) => {
        alert("submit")
    };

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
    let chaptersReducer = (state, action) => {
        switch (action.type) {

            case 'addChapter':
                return {
                    ...state, chapters: [...state.chapters, action.chapter]
                };

            case 'removeChapter':
                return {
                    ...state, chapters: state.chapters.filter(chapter => chapter.index !== action.index)
                };

            case 'addImageUrl':
                let chapterToEdit = state.chapters[action.chapterIndex];
                let editedChapter = {...chapterToEdit, imgUrl: action.imgUrl};
                return {
                    ...state,
                    chapters:
                        [...state.chapters.slice(0, action.chapterIndex),
                            editedChapter,
                            ...state.chapters.slice(action.chapterIndex + 1)]
                };

            case "addTitle":
                let toEdit = state.chapters[action.chapterIndex];
                let edited = {...toEdit, title: action.title};
                return {
                    ...state,
                    chapters:
                        [...state.chapters.slice(0, action.chapterIndex),
                            edited,
                            ...state.chapters.slice(action.chapterIndex + 1)]
                };

            case "addContent":
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
                throw new Error("Error in useReducer");
        }
    };

    const [state, dispatch] = useReducer(chaptersReducer, initialState);

    let removeChapterAC = (index) => {
        dispatch({type: "removeChapter", index})
    };

    let addTitleAC = (chapterIndex, title) => {
        dispatch({type: "addTitle", title, chapterIndex})
    };

    let addContentAC = (chapterIndex, content) => {
        dispatch({type: "addContent", content, chapterIndex});
        console.log(state)
        console.log(tags)
    };

    let addImageUrlAC = (chapterIndex, imgUrl) => {
        dispatch({type: "addImageUrl", chapterIndex, imgUrl})
    };

    let chapterEditorComponents = state.chapters.map(chapter => <NewChapter key={chapter.index}
                                                                            index={chapter.index}
                                                                            removeChapterAC={removeChapterAC}
                                                                            addImageUrlAC={addImageUrlAC}
                                                                            addTitleAC={addTitleAC}
                                                                            content={chapter.content}
                                                                            addContentAC={addContentAC}/>);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 m-3">
            <h3 className="text-center">New artwork</h3>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name"
                       ref={register({required: "Please input name"})}/>
                <div className="text-danger">  {errors.name && <span>{errors.name.message}</span>}</div>
            </div>

            <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input className="form-control" type="text" name="summary"
                       ref={register({required: "Please input summary"})}/>
                <div className="text-danger">  {errors.summary && <span>{errors.summary.message}</span>}</div>
            </div>

            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select className="form-control" type="text" name="genre"
                        ref={register({required: "Please select genre"})}>
                    <option></option>
                    <option value="fantasy"> Fantasy</option>
                    <option value="erotic"> Erotic</option>
                </select>
                <div className="text-danger">  {errors.genre && <span>{errors.genre.message}</span>}</div>
            </div>


            <label htmlFor="tags">Tags</label>
            <div className="mb-4">
                <TagManager tags={tags}
                            setTags={setTags}
                            allTags={allTags}/>
            </div>

            {chapterEditorComponents}

            <div className="text-center mt-2">
                <div className="btn btn-secondary" onClick={() => {
                    dispatch({
                        type: "addChapter", chapter: {
                            index: state.chapters.length,
                            title: null,
                            content: null,
                            imgUrl: null
                        }
                    })
                }}>
                    Add chapter
                </div>
            </div>

            <div className="text-center m-4">
                <button className="btn btn-success w-25">Submit</button>
            </div>

        </form>
    )
};


export default NewArtwork;