import * as React from "react";
import {useEffect} from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useForm} from "react-hook-form";
import TagManager from "./TagManager";
import {useDispatch, useSelector} from "react-redux";
import {
    requestArtworkToEdit,
    requestGenres,
    requestTags,
    setArtworkToEdit,
    submitArtwork
} from "../../../../redux/artworkFormReducer";
import GenresInput from "./GenresInput";
import NameInput from "./NameInput";
import SummaryInput from "./SummaryInput";
import ChaptersManager from "./ChaptersManager";
import {Redirect} from "react-router";

const ArtworkForm = (props) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();
    const convertTagsToList = (tags) => {
        return tags.map(tag => tag.name);
    };


    const [genre, setGenre] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const artworkToEdit = useSelector(state => {
        return state.artworkFormReducer.artworkToEdit
    });
    const submittedId = useSelector(state => {
        return state.artworkFormReducer.submittedId
    });
    const newChapters = useSelector(state => {
        return state.artworkFormReducer.chapters
    });
    const onSubmit = (artwork) => {
        artwork.tags = convertTagsToList(tags);
        artwork.chapters = newChapters;
        dispatch(submitArtwork(artwork));
    };
    useEffect(() => {
            dispatch(requestTags());
            dispatch(requestGenres());
            dispatch(requestArtworkToEdit(props.match.params.artworkId));
            if (!props.match.params.artworkId) {
                dispatch(setArtworkToEdit({}));
                setGenre("");
                setTags([]);
            }
        }
        , [props.match.params.artworkId, props.location, props.path]
    );

    useEffect(() => {
        if (artworkToEdit?.tags) {
            setTags(artworkToEdit.tags);
            setGenre(artworkToEdit.genre.name);
        }
    }, [artworkToEdit]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 m-3">

            <h3 className="text-center">{props.match.params.artworkId ? "Edit:" : "New artwork"}</h3>

            <NameInput register={register}
                       name={artworkToEdit?.name}
                       errors={errors}/>

            <SummaryInput register={register}
                          summary={artworkToEdit?.summary}
                          errors={errors}/>

            <GenresInput register={register}
                         errors={errors}
                         genre={genre}
                         setGenre={setGenre}/>

            <TagManager tags={tags}
                        setTags={setTags}/>

            <ChaptersManager artworkId={props.match.params.artworkId}/>

            <div className="text-center m-4">
                <button className="btn btn-success w-25">Submit</button>
            </div>

            {submittedId && <Redirect to={`/artworks/id/${submittedId}`}/>}

        </form>
    )
};


export default ArtworkForm;