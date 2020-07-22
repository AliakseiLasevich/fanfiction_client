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
    postArtwork, updateArtwork
} from "../../../../redux/artworkFormReducer";
import GenresInput from "./GenresInput";
import NameInput from "./NameInput";
import SummaryInput from "./SummaryInput";
import ChaptersManager from "./ChaptersManager";
import {Redirect} from "react-router";
import {useMemo} from "react";

const ArtworkForm = (props) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();
    const convertTagsToList = (tags) => {
        return tags.map(tag => tag.name);
    };

    let artworkIdToEdit = useMemo(() => props.match.params.artworkId, [props.match.params.artworkId])

    const [genre, setGenre] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const artworkToEdit = useSelector(state => {
        return state.artworkFormReducer.artworkToEdit
    });
    const submittedId = useSelector(state => {
        return state.artworkFormReducer.submittedId
    });
    const likes = useSelector(state => {
        return state.artworkFormReducer.submittedId
    });
    const newChapters = useSelector(state => {
        return state.artworkFormReducer.chapters
    });
    const userId = useSelector(state => {
        return state.authReducer.currentUser.userId
    });

    const onSubmit = (artwork) => {
        artwork.tags = convertTagsToList(tags);
        artwork.chapters = newChapters;
        artwork.likes = likes;
        if (artworkIdToEdit) {
            dispatch(updateArtwork(artwork, artworkIdToEdit, userId))
        } else {
            dispatch(postArtwork(artwork, userId));
        }
    };
    useEffect(() => {
            dispatch(requestTags());
            dispatch(requestGenres());
            dispatch(requestArtworkToEdit(artworkIdToEdit));
            if (!artworkIdToEdit) {
                dispatch(setArtworkToEdit({}));
                setGenre("");
                setTags([]);
            }
        }
        , [artworkIdToEdit, props.location, props.path]
    );

    useEffect(() => {
        if (artworkToEdit?.tags) {
            setTags(artworkToEdit.tags);
            setGenre(artworkToEdit.genre.name);
        }
    }, [artworkToEdit]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 m-3">

            <h3 className="text-center">{artworkIdToEdit ? "Edit:" : "New artwork"}</h3>

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

            <ChaptersManager artworkId={artworkIdToEdit}/>

            <div className="text-center m-4">
                <button className="btn btn-success w-25">Submit</button>
            </div>

            {submittedId && <Redirect to={`/artworks/id/${submittedId}`}/>}

        </form>
    )
};


export default ArtworkForm;