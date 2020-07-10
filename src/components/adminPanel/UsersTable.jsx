import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsers, updateUserDetails} from "../../redux/usersReducer";
import Table from "../common/Table";

const UsersTable = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState();

    const jwt = useSelector(state => {
        return state.authReducer.jwt;
    });

    const allUsers = useSelector(state => {
        return state.usersReducer.allUsers;
    });

    const deleteUserById = (userId, jwt) => {
        dispatch(deleteUser(userId, jwt));
    };

    const updateUser = (user, jwt) => {
        dispatch(updateUserDetails(user, jwt));
        dispatch(getUsers(jwt));
        setUsers(allUsers);
    };

    useEffect(() => {
        dispatch(getUsers(jwt));
    }, [jwt, users]);


    const hasAdminRole = (user) => {
        if (Object.entries(user).length !== 0) {
            return user.roles.some(role => role.name === "ROLE_ADMIN");
        }
    };

    const addAdminRole = (user) => {
        user.rolesNames = user.roles.map(role => role.name);
        updateUser({...user, rolesNames: [...user.rolesNames, "ROLE_ADMIN"]}, jwt)
    };

    const removeAdminRole = (user) => {
        user.rolesNames = user.roles
            .map(role => role.name)
            .filter(role => role !== "ROLE_ADMIN");
        updateUser(user, jwt);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Select",
                accessor: (user) => <input type="checkbox" name="users" value={user.userId}/>,
            },
            {
                Header: "First Name",
                accessor: "firstName"
            },
            {
                Header: "Last Name",
                accessor: "lastName"
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Admin",
                accessor: user => hasAdminRole(user) ?
                    <button className="btn-success"
                            onClick={() => removeAdminRole(user)}>Admin</button> :
                    <button className="btn-secondary"
                            onClick={() => addAdminRole(user)}>User</button>
            },
            {
                Header: "Block",
                accessor: user => user.nonBlocked ?
                    <button className="btn-warning"
                            onClick={() => updateUser({...user, nonBlocked: false}, jwt)}>Block</button> :
                    <button className="btn-info"
                            onClick={() => updateUser({...user, nonBlocked: true}, jwt)}>UnBlock</button>
            },
            {
                Header: "Delete",
                accessor: user => <button className="btn-danger"
                                          onClick={() => deleteUserById(user.userId, jwt)}>Delete</button>
            },

        ], [deleteUserById, jwt, updateUser]);

    return (
        <div>
            <Table columns={columns}
                   data={allUsers}/>
        </div>
    )
};


export default UsersTable;