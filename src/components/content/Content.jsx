import React from "react";
import Artwork from "./artwork/Artwork";
import Sidebar from "../sidebar/Sidebar";

const Content = () => {
    return (
        <div>
            <div className="d-flex justify-content-center row mx-auto">
                <button className="btn btn-sm btn-secondary btn-block">New artwork</button>
            </div>
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