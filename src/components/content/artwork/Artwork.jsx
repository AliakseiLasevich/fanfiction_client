import React, {useEffect, useState} from "react";
import {Redirect, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getArtworkById} from "../../../redux/artworkReducer";
import ReactMarkdown from "react-markdown";
import {CommentsByWebSocket} from "../comments/CommentsByWebSocket";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Chapter from "./Chapter";

const Artwork = (props) => {
    const {path} = useRouteMatch();
    let match = useRouteMatch({
        path: path,
        strict: true,
        sensitive: true
    });

    const openedArtwork = match.params.artworkId;

    const [artworkToEdit, setArtworkToEdit] = useState(null);

    useEffect(() => {
        dispatch(getArtworkById(openedArtwork))
    }, []);


    const dispatch = useDispatch();

    const currentArtwork = useSelector(state => {
        return state.artworkReducer.currentArtwork
    });
    const currentUser = useSelector(state => {
        return state.authReducer.currentUser;
    });

    let chapters = [];

    if (currentArtwork.chapters) {
        chapters = currentArtwork.chapters.map(chapter =>
                <Chapter chapterId={chapter.id}
                         chapterNumber={chapter.chapterNumber + 1}
                         chapterTitle={chapter.title}
                         imageUrl={chapter.imageUrl}
                         content={chapter.content}
                />
        );
    }

    return (
        <div className="container">
            <div className="row m-2">
                <div className="col card-header text-center"><h2>{currentArtwork.name}</h2></div>
            </div>

            <div className="row">{chapters}</div>

            <div className="text-center"><h3>Please rate artwork.</h3></div>
            <div className="row justify-content-center">
                <Rating
                    name="size-large"
                    defaultValue={0}
                    precision={1}
                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    onChange={(event, newValue) => alert(newValue)}
                />
            </div>

            {currentArtwork.authorId == currentUser.userId  || currentUser.roles?.some(role=>role.name === "ROLE_ADMIN")?
                <div className="col btn btn-light" onClick={()=>setArtworkToEdit(currentArtwork.artworkId)}>Edit</div> : null}
            <CommentsByWebSocket openedArtwork={openedArtwork}/>

            {artworkToEdit && <Redirect to={`/artwork-form/${artworkToEdit}`}/>}
        </div>
    )
};

export default Artwork;