import * as React from "react";
import {useEffect} from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useForm} from "react-hook-form";
import TagManager from "./TagManager";
import {useDispatch, useSelector} from "react-redux";
import {requestGenres, requestTags, submitArtwork} from "../../../../redux/artworkFormReducer";
import {getArtworkById, resetCurrentArtworkState} from "../../../../redux/artworkReducer";
import GenresInput from "./GenresInput";
import NameInput from "./NameInput";
import SummaryInput from "./SummaryInput";
import ChaptersManager from "./ChaptersManager";

const ArtworkForm = (props) => {

    const dispatch = useDispatch();
    const [artwork, setArtwork] = React.useState([]);
    const [genre, setGenre] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [chapters, setChapters] = React.useState([{}]);

    const currentArtwork = useSelector(state => {
        return state.artworkReducer.currentArtwork
    });

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (artwork) => {
        artwork.tags = convertTagsToList(tags);
        artwork.chapters = chapters;
        dispatch(submitArtwork(artwork));
    };

    const convertTagsToList = (tags) => {
        return tags.map(tag => tag.name);
    };

    useEffect(() => {
        if (currentArtwork.genre) {
            setArtwork(currentArtwork);
            setTags(currentArtwork.tags);
            setGenre(currentArtwork.genre.name);
            setChapters(currentArtwork.chapters);
        }
    }, [currentArtwork]);

    useEffect(() => {
            dispatch(requestTags());
            dispatch(requestGenres());
            dispatch(getArtworkById(props.match.params.artworkId));
            if (!props.match.params.artworkId) {
                dispatch(resetCurrentArtworkState());
                setArtwork({});
                setGenre("");
                setTags([]);
                setChapters([]);
            }
        }
        , [props.match.params.artworkId]
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 m-3">

            <h3 className="text-center">{props.match.params.artworkId ? "Edit:" : "New artwork"}</h3>

            <NameInput register={register}
                       name={artwork.name}
                       errors={errors}/>

            <SummaryInput register={register}
                          summary={artwork.summary}
                          errors={errors}/>

            <GenresInput register={register}
                         errors={errors}
                         genre={genre}
                         setGenre={setGenre}/>

            <TagManager tags={tags}
                        setTags={setTags}/>

            <ChaptersManager chapters={chapters}
                             setChapters={setChapters}/>

            <div className="text-center m-4">
                <button className="btn btn-success w-25">Submit</button>
            </div>
        </form>
    )
};


export default ArtworkForm;