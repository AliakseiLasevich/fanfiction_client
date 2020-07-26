import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestTopArtworks} from "../../redux/artworkReducer";
import {NavLink} from "react-router-dom";

const TopArtworks = () => {

    const dispatch = useDispatch();

    const topArtworks = useSelector(state => {
        return state.artworkReducer.topArtworks;
    });

    useEffect(() => {
        dispatch(requestTopArtworks());
    }, [dispatch]);


    const topArtworksList = topArtworks.map(artwork =>
        <li className="list-group-item list-group-item-action">
            <NavLink to={`/artworks/id/${artwork.artworkId}`}>{artwork.name}</NavLink>
        </li>)


    return (
        <div>
            <div className="row justify-content-center"><h2>Top 5</h2></div>
            <ol className="list-group my-2">
                {topArtworksList}
            </ol>
        </div>
    )
};

export default TopArtworks;