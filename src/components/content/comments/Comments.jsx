import React from "react";
import Moment from "react-moment";

const Comments = (props) => {

    const commentComponents = props.comments.map(comment =>
        <div key={comment.id} className="row mx-5 my-1 p-1 border">
            <div className="col-2">{comment.userNickName}</div>
            <div className="col-8 text-left">{comment.content}</div>
            <div className="col-2 text-left"><Moment toNow>{comment.publicationDate}</Moment></div>
        </div>)
    return (
        <div className="m-1 p-3 text-center">
            {commentComponents.length > 0 ? <h2>Comments: </h2> : ""}
            {commentComponents}
        </div>
    )
};

export default Comments;