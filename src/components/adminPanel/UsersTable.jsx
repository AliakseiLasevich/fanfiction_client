import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTable} from 'react-table'
import {deleteUser, getUsers, putUser} from "../../redux/usersReducer";

const UsersTable = () => {

    const jwt = useSelector(state => {
        return state.authReducer.jwt;
    });

    const allUsers = useSelector(state => {
        return state.usersReducer.allUsers;
    });

    useEffect(() => {
        dispatch(getUsers(jwt));
    }, [jwt, allUsers]);

    const dispatch = useDispatch();

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
                accessor: user => user.nonBlocked ?
                    <button className="btn-warning"
                            onClick={() => blockUser({...user, nonBlocked: false}, jwt)}>Block</button> :
                    <button className="btn-info"
                            onClick={() => blockUser({...user, nonBlocked: true}, jwt)}>UnBlock</button>
            },
            {
                Header: "Delete",
                accessor: user => <button className="btn-danger"
                                          onClick={() => deleteUserById(user.userId, jwt)}>Delete</button>
            },

        ], [jwt]);

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