import * as React from "react";
import {useEffect} from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useForm} from "react-hook-form";
import TagManager from "./TagManager";
import NewChapter from "./NewChapter";
import {useDispatch, useSelector} from "react-redux";
import {addChapterAC, requestTags, submitArtwork} from "../../../../redux/artworkFormReducer";

const NewArtwork = (props) => {

    const loadedTags = useSelector(state => {
        return state.artworkFormReducer.tags
    });

    const dispatch = useDispatch();
    const [tags, setTags] = React.useState([]);

    const {register, handleSubmit, errors} = useForm();

    const addChapter = () => {
        dispatch(addChapterAC())
    };

    const allChapters = useSelector(state => {
        return state.artworkFormReducer.chapters
    });

    let chapterEditorComponents = allChapters.map(chapter => <NewChapter key={chapter.index}
                                                                         index={chapter.index}/>);

    const onSubmit = (artwork) => {
        artwork.tags = convertTagsToList(tags);
        artwork.chapters = allChapters;
        dispatch(submitArtwork(artwork));
    };

    const convertTagsToList =(tags) => {
      return tags.map(tag=>tag.name);
    };

    useEffect(() => {
        dispatch(requestTags());
    }, []);

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

                <TagManager
                    loadedTags={loadedTags}
                    tags={tags}
                    setTags={setTags}
                />
            </div>

            {chapterEditorComponents}

            <div className="text-center mt-2">
                <div className="btn btn-secondary" onClick={() => addChapter()}>
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