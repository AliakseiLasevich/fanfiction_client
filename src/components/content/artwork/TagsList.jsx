import React from "react";
import {NavLink} from "react-router-dom";

const TagsList = (props) => {

    const tags = props.tags?.map(tag => <NavLink to={`/search/tag/${tag.name}`} key={tag.name}
                                                 className="mx-1 border bg-secondary text-light">{tag.name}</NavLink>);
    return (
        <>
           Tags: {tags}

        </>
    )
};

export default TagsList;