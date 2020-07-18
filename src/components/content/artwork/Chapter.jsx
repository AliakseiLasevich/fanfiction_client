import React from "react";
import ReactMarkdown from "react-markdown";

const Chapter = (props) => {

    return (
        <div className="container" key={props.chapterId}>
            <div className="row justify-content-center">
                <h2 className="text-center">{`${props.chapterNumber}. ${props.chapterTitle}`}</h2></div>
            {props.imageUrl &&
            <div className="row justify-content-center">
                <img src={props.imageUrl} alt={"no_image_available"} />

            </div>
            }
            <div className="row justify-content-center p-3"><ReactMarkdown source={props.content}/></div>
            <div className="row justify-content-center">
            </div>
        </div>
    )
};

export default Chapter;