import React from "react";
import {NavLink, Route, useRouteMatch} from "react-router-dom";
import UserAccount from "./UserAccount";
import ArtworksTable from "./ArtworksTable";


const Dashboard = (props) => {

    const {url, path} = useRouteMatch();

    return (
        <div className="w-50 text-center mx-auto">

            <ol className="breadcrumb mt-2 d-flex justify-content-center ">
                <li className="breadcrumb-item active">
                    <NavLink className="nav-link" to={`${url}/user-account`}>
                        Account
                    </NavLink>
                </li>
                <li className="breadcrumb-item">
                    <NavLink className="nav-link" to={`${url}/user-artworks`}>
                        Artworks
                    </NavLink>
                </li>
            </ol>

            <Route path={`${path}/user-account`} render={() => <UserAccount/>}/>
            <Route path={`${path}/user-artworks`} render={() => <ArtworksTable/>}/>

        </div>
    )
};

export default Dashboard;