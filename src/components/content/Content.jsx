import React from "react";
import Artwork from "./artwork/Artwork";
import Sidebar from "../sidebar/Sidebar";
import NewArtwork from "./artwork/form/NewArtwork";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Content = () => {

    const logged = useSelector(state => {
        return state.authReducer.logged;
    });

    return (
        <div>
            {logged &&
            // <div className="d-flex justify-content-center row mx-auto">
                <NavLink to="/new-artwork" className="m-1 p-1">
                    <button className="btn btn-sm btn-secondary btn-block">New artwork</button>
                </NavLink>
            // </div>
            }

            <div className="d-flex justify-content-around row">
                <div className="align-self-center p-4 col-10">

                    <Artwork/>
                    <Artwork/>
                    <Artwork/>
                    <Artwork/>
                    <Artwork/>
                    <Artwork/>

                </div>
                <div className="align-self-center p-4 col-2"><Sidebar/></div>
            </div>
        </div>
    )
};

export default Content;