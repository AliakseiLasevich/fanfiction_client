import React from "react";
import UsersManagement from "./UsersManagement";
import {FaUserCog} from 'react-icons/fa';
import {NavLink, Route, withRouter} from "react-router-dom";

const AdminPanel = (props) => {

    return (
        <div>
            <NavLink to="/admin-panel/users-management">
                <button className="btn btn-success btn-lg" type="button">
                    <FaUserCog/> Users management
                </button>
            </NavLink>

            <Route exact path="/admin-panel/users-management"
                   render={() => <UsersManagement/>}/>
        </div>
    )
};

export default withRouter(AdminPanel);