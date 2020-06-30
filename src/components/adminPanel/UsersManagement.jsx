import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, getUsers, setLogged, setUserAndJWT} from "../../redux/usersReducer";
import UsersTable from "./UsersTable";

const UsersManagement = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(jwt));
    }, []);

    const jwt = useSelector(state => {
        return state.usersReducer.jwt;
    });


    return (
        <div>
            <UsersTable/>
        </div>
    )
};

export default UsersManagement;