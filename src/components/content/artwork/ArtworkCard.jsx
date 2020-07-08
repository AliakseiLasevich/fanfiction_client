import React from "react";
import {NavLink} from "react-router-dom";

const ArtworkCard = (props) => {

    return(

        <div className="card row my-3">
            <div className="card-header">
                {props.artworkId}
            </div>
            <div className="card-body">
                <h4 className="card-title">{props.name}</h4>
                <p className="card-text">{props.summary}</p>
                <div className="justify-content-end">

                    <NavLink className="btn btn-light d-block" to={`/artworks/${props.artworkId}`}>Read More</NavLink>
                </div>
            </div>
        </div>


    )
};

export default ArtworkCard;