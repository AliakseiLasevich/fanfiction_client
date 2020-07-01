import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/usersReducer";
import UsersTable from "./UsersTable";

const UsersManagement = (props) => {

    return (
        <div>
            <UsersTable/>
        </div>
    )
};

export default UsersManagement;