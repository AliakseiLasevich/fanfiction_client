import React, {useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {verifyEmailToken} from "../../redux/usersReducer";

const EmailVerificationResult = (props) => {

    const dispatch = useDispatch();
    const {path} = useRouteMatch();
    let match = useRouteMatch({
        path: path,
        strict: true,
        sensitive: true
    });
    const token = match.params.token;

    useEffect(() => {
        dispatch(verifyEmailToken(token));
    }, [token]);

    const result = useSelector(state => {
        return state.usersReducer.emailVerifyResult.operationResult
    });

    return (
        <div className="m-2 p-2">
            {result === "SUCCESS" ?
                <div className="alert alert-success text-center">
                    <strong>Success</strong> Email successfully verified.
                </div>
                :
                <div className="alert alert-danger text-center">
                    <strong>Oops...</strong> Something goes wrong
                </div>
            }
        </div>
    )
};

export default EmailVerificationResult;