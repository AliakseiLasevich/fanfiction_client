import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestCommonTags} from "../../redux/tagsReducer";
import {TagCloud} from 'react-tagcloud'
import {Redirect} from "react-router";

const TagsCloud = () => {

    const dispatch = useDispatch();
    const [tagSelected, setTagSelected] = useState(null);

    const tags = useSelector(state => {
        return state.tagsReducer.tags;
    });

    useEffect(() => {
        dispatch(requestCommonTags());
    }, []);


    const tagZ = Object.keys(tags)
        .map((key) => ({value: key, count: tags[key]}));

    const cloudColorOptions = {
        luminosity: 'dark',
        hue: 'blue',
    };

    return (
        <div className="w-100 border ">
            <div className="row justify-content-center">
                <h2>Tags cloud</h2>
            </div>
            <div className="row justify-content-center">
                <TagCloud
                    minSize={12}
                    maxSize={35}
                    tags={tagZ}
                    onClick={tag => setTagSelected(tag.value)}
                    colorOptions={cloudColorOptions}
                    className={"btn"}
                />
            </div>

            {tagSelected && <Redirect to={`/search/tag/${tagSelected}`}/>}

        </div>
    )
};

export default TagsCloud;