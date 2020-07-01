import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTable} from 'react-table'
import {deleteUser, getUsers, putUser} from "../../redux/usersReducer";

const UsersTable = (props) => {

    const dispatch = useDispatch();

    const allUsers = useSelector(state => {
        return state.usersReducer.allUsers;
    });

    const userId = useSelector(state => {
        return state.authReducer.userId;
    });

    const jwt = useSelector(state => {
        return state.authReducer.jwt;
    });


    useEffect(() => {
        dispatch(getUsers(props.jwt));
        console.log(props)
    }, [allUsers]);


    const deleteUserById = (userId, jwt) => {
        dispatch(deleteUser(userId, jwt));
    };

    const blockUser = (user, jwt) => {
        dispatch(putUser(user, jwt));
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
                Header: "Active",
                accessor: user => user.nonBlocked.toString()
            },
            {
                Header: "Block",
                accessor: user => <button className="btn-warning"
                                          onClick={() => blockUser({
                                              ...user,
                                              nonBlocked: false
                                          }, jwt)}>Block</button>
            },
            {
                Header: "Delete",
                accessor: user => <button className="btn-danger"
                                          onClick={() => deleteUserById(user.userId, jwt)}>Delete</button>
            },

        ], []);

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