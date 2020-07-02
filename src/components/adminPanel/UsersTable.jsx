import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTable} from 'react-table'
import {deleteUser, getUsers, putUser} from "../../redux/usersReducer";

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
        dispatch(putUser(user, jwt));
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
                            onClick={() => updateUser({...user, roles: ["ROLE_USER"]}, jwt)}>Admin</button> :
                    <button className="btn-secondary"
                            onClick={() => updateUser({
                                ...user, roles: [...user.roles, "ROLE_ADMIN"]
                            }, jwt)}>User</button>
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

const Table = ({columns, data}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data
        }
    )

    return (

        <table {...getTableProps()} className="table table-striped">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )


};

export default UsersTable;