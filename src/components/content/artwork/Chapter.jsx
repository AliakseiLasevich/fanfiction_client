import React from "react";
import ReactMarkdown from "react-markdown";
import LikeButton from "./LikeButton";

const Chapter = (props) => {

    return (
        <div className="container border p-2 m-2" key={props.chapterId}>
            <div className="row justify-content-center">
                <h2 className="text-center">{`${props.chapterNumber}. ${props.chapterTitle}`}</h2></div>
            {props.imageUrl &&
            <div className="row justify-content-center">
                <img src={props.imageUrl} alt="Chapter image"/>
            </div>
            }
            <div className="row justify-content-center p-3"><ReactMarkdown source={props.content}/></div>
            <div className="row justify-content-center">
                <LikeButton/>
            </div>
        </div>
    )
};

export default Chapter;