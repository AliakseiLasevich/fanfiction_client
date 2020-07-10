import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

const CommentForm = (props) => {


    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const logged = useSelector(state => {
        return state.authReducer.logged
    });

    const onSubmit = ({comment}) => {
        alert(comment)
    };


    return (
        <>
            {logged &&
            <div className="m-3 p-3 row justify-content-center">

                <button className="btn btn-success" onClick={() => props.postComment("New comment")}>TEST SOCKET</button>

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