import React, {useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getArtworkById} from "../../../redux/artworkReducer";
import ReactMarkdown from "react-markdown";
import {CommentsByWebSocket} from "../comments/CommentsByWebSocket";

const Artwork = (props) => {
    const {path} = useRouteMatch();
    let match = useRouteMatch({
        path: path,
        strict: true,
        sensitive: true
    });

    const openedArtwork = match.params.artworkId;

    useEffect(() => {
        dispatch(getArtworkById(openedArtwork))
    }, []);


    const dispatch = useDispatch();

    const currentArtwork = useSelector(state => {
        return state.artworkReducer.currentArtwork
    });

    let chapters = [];

    if (currentArtwork.chapters) {
        chapters = currentArtwork.chapters.map(chapter =>

            <div className="border p-2 m-2" key={chapter.id}>
                <div className="d-flex justify-content-center">
                    <h2>{`${chapter.chapterNumber + 1}. ${chapter.title}`}</h2></div>
                {chapter.imageUrl &&
                <div className="row justify-content-center">
                    <img src={chapter.imageUrl} alt="Chapter image"/>
                </div>}
                <div><ReactMarkdown source={chapter.content}/></div>
            </div>

        );
    }

    return (
        <div>
            <div className="row m-2">
                <div className="col card-header text-center"><h2>{currentArtwork.name}</h2></div>
            </div>

            <div className="row border">
                <div className="col">{chapters}</div>
            </div>


            <CommentsByWebSocket openedArtwork={openedArtwork}/>

        </div>
    )
};

export default Artwork;