import React from "react";
import TopArtworks from "./TopArtworks";
import TagCloud from "./TagCloud";

const Sidebar = () => {

    return(
        <div className="d-flex flex-column row">
           <TopArtworks/>
           <TagCloud/>
        </div>
    )
};

export default Sidebar;