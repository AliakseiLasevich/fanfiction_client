import React from "react";
import UsersManagement from "./UsersManagement";
import {FaUserCog} from 'react-icons/fa';
import {NavLink, Route} from "react-router-dom";

const AdminPanel = (props) => {

    return (
        <div>
            <NavLink to="/admin-panel/users-management">
                <button className="btn btn-success btn-lg" type="button">
                    <FaUserCog/> Users management
                </button>
            </NavLink>

            <Route path="/admin-panel/users-management"
                   render={() => <UsersManagement/>}/>


        </div>
    )
};

export default AdminPanel;