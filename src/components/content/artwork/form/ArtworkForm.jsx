import * as React from "react";
import {useCallback, useEffect} from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useForm} from "react-hook-form";
import TagManager from "./TagManager";
import ChapterForm from "./ChapterForm";
import {useDispatch, useSelector} from "react-redux";
import {
    addChapterAC,
    requestGenres,
    requestTags,
    setChaptersAC,
    submitArtwork
} from "../../../../redux/artworkFormReducer";
import {useRouteMatch} from "react-router-dom";
import {getArtworkById} from "../../../../redux/artworkReducer";

const ArtworkForm = (props) => {

    const dispatch = useDispatch();
    const [tags, setTags] = React.useState([]);

    const {register, handleSubmit, errors} = useForm();

    const addChapter = () => {
        dispatch(addChapterAC())
    };

    const loadedTags = useSelector(state => {
        return state.artworkFormReducer.tags
    });
    const allChapters = useSelector(state => {
        return state.artworkFormReducer.chapters
    });

    const {path} = useRouteMatch();
    let match = useRouteMatch({
        path: path,
        strict: true,
        sensitive: true
    });
    const artworkIdToEdit = match.params.artworkId;

    const currentArtwork = useSelector(state => {
        return state.artworkReducer.currentArtwork
    });

    const onSubmit = (artwork) => {
        artwork.tags = convertTagsToList(tags);
        artwork.chapters = allChapters;
        dispatch(submitArtwork(artwork));
    };

    const convertTagsToList = (tags) => {
        return tags.map(tag => tag.name);
    };

    const [genre, setGenre] = React.useState([]);

    const convertedGenresToOptions = (genres) => {
        if (genres) {
            return genres.map(genre => <option value={`${genre.name}`}>{genre.name}</option>)
        }
    };
    const loadedGenres = useSelector(state => {
        return state.artworkFormReducer.genres
    });

    const genresInput = useCallback(
        () => {
            return (
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-control" name="genre" ref={register({required: "Please select genre"})}
                            value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option></option>
                        {convertedGenresToOptions(loadedGenres)}
                    </select>
                    <div className="text-danger">  {errors.genre && <span>{errors.genre.message}</span>}</div>
                </div>
            )
        },
        [genre, loadedGenres],
    );

    useEffect(() => {
        dispatch(requestTags());
        dispatch(requestGenres());
        dispatch(getArtworkById(artworkIdToEdit));
    }, []);

    useEffect(() => {
        if (currentArtwork.tags) {
            setTags(currentArtwork.tags)
        }
        if (currentArtwork.genre.name) {
            setGenre(currentArtwork.genre.name)
        }
        if (currentArtwork.chapters) {
            dispatch(setChaptersAC(currentArtwork.chapters))
        }
    }, [currentArtwork]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 m-3">
            <h3 className="text-center">{artworkIdToEdit ? "Edit:" : "New artwork"}</h3>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name"
                       ref={register({required: "Please input currentArtworkName"})}
                       defaultValue={currentArtwork.name}/>
                <div className="text-danger">  {errors.name && <span>{errors.name.message}</span>}</div>
            </div>

            <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input className="form-control" type="text" name="summary"
                       ref={register({required: "Please input currentArtworkSummary"})}
                       defaultValue={currentArtwork.summary}/>
                <div className="text-danger">  {errors.summary && <span>{errors.summary.message}</span>}</div>
            </div>

            {genresInput()}

            <label htmlFor="tags">Tags</label>
            <div className="mb-4">
                <TagManager
                    loadedTags={loadedTags}
                    tags={tags}
                    setTags={setTags}
                />
            </div>

            {artworkIdToEdit && currentArtwork.chapters ?
                currentArtwork.chapters.map(chapter => <ChapterForm key={chapter.chapterNumber}
                                                                    index={chapter.chapterNumber}
                                                                    content={chapter.content}
                                                                    title={chapter.title}/>)
                :
                allChapters.map(chapter => <ChapterForm key={chapter.index}
                                                        index={chapter.index}/>)}

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


export default ArtworkForm;