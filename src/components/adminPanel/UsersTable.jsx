import React from "react";
import {useSelector} from "react-redux";

const UsersTable = () => {

    const allUsers = useSelector(state => {
        return state.usersReducer.allUsers;
    });

    const all = allUsers.map(user => <div>{user.email}</div>);

    return (
        <div>
            {all}
        </div>
    )
};

export default UsersTable;