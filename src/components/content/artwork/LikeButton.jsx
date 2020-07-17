import React from "react";
import {FaThumbsUp} from "react-icons/fa";
import style from "./LikeButton.module.css";
import {useDispatch} from "react-redux";
import {postLike} from "../../../redux/artworkReducer";

const LikeButton = (props) => {

    const dispatch = useDispatch();
    const hasLike = (likes) => {
        return likes?.find(like => like?.chapterNumber === props.chapterNumber)?.value
    };

    const setLikeToChapter = () => {
        dispatch(postLike(props.currentUser.userId, props.artworkId, props.chapterNumber));
    };


    return (
        <div className={style.button}>
            {hasLike(props.likes) ? <FaThumbsUp size={32} color="#52a9bf"/>
                :
                <button onClick={() => setLikeToChapter()} className="btn"><FaThumbsUp size={32}/></button>}
        </div>
    )
};

export default LikeButton;