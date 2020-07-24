import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getArtworkById} from "../../../redux/artworkReducer";
import {CommentsByWebSocket} from "../comments/CommentsByWebSocket";
import Chapter from "./Chapter";
import LikeButton from "./LikeButton";
import RatingComponent from "./RatingComponent";
import TagsList from "./TagsList";

const Artwork = (props) => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => {
        return state.authReducer.currentUser;
    });
    const openedArtwork = props.match.params.artworkId;
    const [artworkToEdit, setArtworkToEdit] = useState(null);

    useEffect(() => {
        dispatch(getArtworkById(openedArtwork));
    }, [currentUser.userId, openedArtwork]);


    const currentArtwork = useSelector(state => {
        return state.artworkReducer.currentArtwork
    });

    let chapters = currentArtwork.chapters?.map(chapter =>
        <div className="container border m-1 p-1">
            <div className="row">
                <Chapter chapterId={chapter.id}
                         chapterNumber={chapter.chapterNumber + 1}
                         chapterTitle={chapter.title}
                         imageUrl={chapter.imageUrl}
                         content={chapter.content}
                />
            </div>
            {Object.keys(currentUser).length !== 0 &&
            <div className="row justify-content-center">
                <LikeButton chapterId={chapter.chapterId}
                            artworkId={currentArtwork.artworkId}
                            currentUser={currentUser}/>
            </div>
            }
        </div>
    );

    return (
        <div className="container">
            <div className="row m-2">
                <div className="col card-header text-center"><h2>{currentArtwork.name}</h2></div>
            </div>

            <div className="row">{chapters}</div>

            {Object.keys(currentUser).length !== 0 && <RatingComponent/>}

            <div className="row justify-content-center m-1">
                <TagsList tags={currentArtwork.tags}/>
            </div>

            {currentArtwork.authorId === currentUser.userId || currentUser.roles?.some(role => role.name === "ROLE_ADMIN") ?
                <div className="col btn btn-light"
                     onClick={() => setArtworkToEdit(currentArtwork.artworkId)}>Edit current artwork</div> : null
            }

            <CommentsByWebSocket openedArtwork={openedArtwork}/>

            {artworkToEdit && <Redirect to={`/artwork-form/${artworkToEdit}`}/>}


        </div>
    )
};

export default Artwork;