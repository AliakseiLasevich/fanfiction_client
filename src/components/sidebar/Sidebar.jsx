import React from "react";
import TopArtworks from "./TopArtworks";
import TagsCloud from "./TagsCloud";


const Sidebar = () => {

    return(
        <div className="d-flex flex-column row">
           <TopArtworks/>
           <TagsCloud/>
        </div>
    )
};

export default Sidebar;