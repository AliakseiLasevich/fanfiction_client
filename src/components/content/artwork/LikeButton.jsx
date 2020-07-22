import React, {useEffect} from "react";
import {FaThumbsUp} from "react-icons/fa";
import style from "./LikeButton.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getUserLikes, postLike} from "../../../redux/artworkReducer";

const LikeButton = (props) => {

    const dispatch = useDispatch();

    const userLikes = useSelector(state => {
        return state.artworkReducer.userLikes;
    });

    useEffect(() => {
        dispatch(getUserLikes(props.currentUser.userId, props.chapterId));
    }, [dispatch, props.chapterId, props.currentUser.userId]);

    const hasLike = () => {
        let s = userLikes?.find(like => like?.chapterId === props.chapterId)?.value;
        return s;
    };

    const setLikeToChapter = () => {
        dispatch(postLike(props.currentUser.userId, props.chapterId));
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