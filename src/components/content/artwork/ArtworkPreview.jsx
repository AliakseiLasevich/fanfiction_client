import React from "react";
import {NavLink} from "react-router-dom";
import Moment from "react-moment";
// import Moment from 'react-moment';

const ArtworkPreview = (props) => {

    return (

        <div className="border p-3 m-2">
            <div className="row bg-secondary justify-content-center ">
                <h4 className="text-white">{props.name}</h4>
            </div>
            <div className="row m-2 p-2">
                {props.summary}
            </div>
            <div className="col-auto text-right"> <strong>{props.authorName}</strong> <Moment toNow>{props.creationDate}</Moment></div>

            <div className="row justify-content-between">
                <NavLink className="btn btn-light col" to={`/artworks/id/${props.artworkId}`}>Read
                    More</NavLink>
            </div>


        </div>


    )
};

export default ArtworkPreview;