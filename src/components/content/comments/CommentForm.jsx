import React from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

const CommentForm = (props) => {


    const {register, handleSubmit, errors, reset} = useForm();
    const logged = useSelector(state => {
        return state.authReducer.logged
    });
    const userId = useSelector(state => {
        return state.authReducer.currentUser.userId
    });

    const onSubmit = ({comment}) => {
        let newComment = {userId, comment}
        props.postComment(newComment)
        reset()
    };

    return (
        <>
            {logged &&
            <div className="m-3 p-3 row justify-content-center">

                <form onSubmit={handleSubmit(onSubmit)} className="col-9">
                    <div className="form-group">
                        <label htmlFor="comment"><h3>Comment</h3></label>
                        <textarea className="form-control" type="text" name="comment"
                                  ref={register({required: "Write some kind words here"})}/>
                        <div className="text-danger">  {errors.comment &&
                        <span>{errors.comment.message}</span>}</div>
                    </div>

                    <div>
                        <input type="submit" value="Send"/>
                    </div>

                </form>
            </div>
            }
        </>
    )
};

export default CommentForm;