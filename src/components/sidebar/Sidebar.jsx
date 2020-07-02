import React from "react";
import TopArtworks from "./TopArtworks";
import TagCloud from "./TagCloud";
import SearchPanel from "./SearchPanel";

const Sidebar = () => {


    return(
        <div className="d-flex flex-column row">
           <TopArtworks/>
           <SearchPanel/>
           <TagCloud/>
        </div>
    )
};

export default Sidebar;