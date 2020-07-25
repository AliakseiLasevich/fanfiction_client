import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Moment from "react-moment";
import TagsList from "./TagsList";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {useDispatch, useSelector} from "react-redux";
import {requestAverageArtworkRating} from "../../../redux/artworkReducer";

const ArtworkPreview = (props) => {

    const [avgRating, setAvgRating] = useState(0);

    const dispatch = useDispatch();
    const averageRatings = useSelector(state => {
        return state.artworkReducer.averageRatings;
    });

    useEffect(() => {
        dispatch(requestAverageArtworkRating(props.artworkId));
    }, [dispatch, props.artworkId]);

    useEffect(() => {
        let average = averageRatings.find(rating => rating.artworkId === props.artworkId)?.value;
        setAvgRating(average);
    }, [averageRatings, props.artworkId]);

    return (
        <div className="border p-3 m-2">
            <div className="row bg-warning justify-content-center">
                <h4 className="text-white">{props.name}</h4>
            </div>
            <div className="row m-2 p-2">
                {props.summary}
            </div>
            <div className="col-auto text-right"><strong>{props.authorName}</strong> <Moment
                toNow>{props.creationDate}</Moment></div>

            <div className="row justify-content-between">
                <NavLink className="btn btn-light col" to={`/artworks/id/${props.artworkId}`}>Read
                    More</NavLink>
            </div>


            <div className="row justify-content-between">
                <div className="align-items-center">
                    <TagsList tags={props.tags}/>
                </div>
                <div className="align-items-center">

                    {avgRating ? "Average rating:" : "Not rated"}
                    <Rating
                        name="size-large"
                        value={avgRating || 0}
                        precision={0.1}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        onChange={(event, newValue) => alert(newValue)}
                        readOnly
                    />

                </div>
            </div>
        </div>


    )
};

export default ArtworkPreview;