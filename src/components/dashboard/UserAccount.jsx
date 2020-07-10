import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserDetails} from "../../redux/usersReducer";
import {logoutAC, setCurrentUser} from "../../redux/authReducer";
import {NavLink} from "react-router-dom";

const UserAccount = () => {

    const dispatch = useDispatch();
    const [emailEditMode, setEmailEditMode] = useState(false);
    const [tempEmail, setTempEmail] = useState(null);

    const currentUser = useSelector(state => {
        return state.authReducer.currentUser
    });

    useEffect(() => {
        setTempEmail(currentUser.email)
    }, [currentUser.email]);

    const jwt = useSelector(state => {
        return state.authReducer.jwt
    });

    const onNameChange = (event) => {
        let newUser = {...currentUser, firstName: event.target.value};
        dispatch(updateUserDetails(newUser, jwt));
        dispatch(setCurrentUser(newUser));
    };

    const onLastNameChange = (event) => {
        let newUser = {...currentUser, lastName: event.target.value};
        dispatch(updateUserDetails(newUser, jwt));
        dispatch(setCurrentUser(newUser));
    };

    const onEmailChange = (event) => {
        setTempEmail(event.target.value)
    };

    const submitEmail = () => {
        let newUser = null;
        if (tempEmail) {
            newUser = {...currentUser, email: tempEmail};
            dispatch(updateUserDetails(newUser, jwt))
            dispatch(logoutAC())
            setEmailEditMode(false)
        }
    };

    return (
        <div className="container">
            <h2>Account info</h2>

            <div className="mb-3 row align-items-center">
                <div className="col-md-4 col-sm-6 px-0">
                    <span className="input-group-text justify-content-center">First Name</span>
                </div>
                <div className="form-control col-md-8 col-sm-6 p-0">
                    <input className="form-control text-center"
                           onChange={(value) => onNameChange(value)}
                           type="text"
                           placeholder="First Name"
                           value={currentUser.firstName}/>
                </div>
            </div>

            <div className="mb-3 row align-items-center">
                <div className="col-md-4 col-sm-6 px-0">
                    <span className="input-group-text justify-content-center">Last Name</span>
                </div>
                <div className="form-control col-md-8 col-sm-6 p-0">
                    <input className="form-control text-center"
                           onChange={(value) => onLastNameChange(value)}
                           type="text"
                           placeholder="Last Name"
                           value={currentUser.lastName}/>
                </div>
            </div>


            <div className="mb-3 row align-items-center">

                <div className="col-md-4 col-sm-6 px-0">
                    <span className="input-group-text justify-content-center">Email</span>
                </div>

                <div className="form-control col-md-8 col-sm-6 p-0">

                    <div className="container">
                        <div className="row justify-content-center">
                            <input
                                className={emailEditMode ? "form-control text-center col-8" : "form-control text-center col-12"}
                                onClick={() => {
                                    setTempEmail(currentUser.email);
                                    setEmailEditMode(true)
                                }}

                                onChange={(value) => onEmailChange(value)}
                                onSubmit={() => alert("sub")}
                                type="text"
                                placeholder="Email"
                                value={tempEmail}/>
                            {emailEditMode &&
                            <NavLink to="/">
                                <button className="btn btn-sm btn-success m-1 col-10"
                                        onClick={() => submitEmail()}>✓
                                </button>
                             </NavLink>
                            }

                        </div>
                        {emailEditMode &&
                        <div className="alert alert-warning row">Need to confirm new email and relogin</div>}
                    </div>

                </div>
            </div>


        </div>
    )
};

export default UserAccount;