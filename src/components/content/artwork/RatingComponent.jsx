import React, {useEffect, useMemo, useState} from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import {useDispatch, useSelector} from "react-redux";
import {
    createRating,
    requestAverageArtworkRatings,
    requestCurrentArtworkAverageRating,
    requestRatingByUserAndArtwork
} from "../../../redux/artworkReducer";

const RatingComponent = (props) => {

    const dispatch = useDispatch();

    const currentAverageRating = useSelector(state => {
        return state.artworkReducer.currentArtworkAverageRating;
    });
    const userRating = useSelector(state => {
        return state.artworkReducer.currentArtworkUserRating;
    });

    useEffect(() => {
        dispatch(requestAverageArtworkRatings(props.artworkId));
        dispatch(requestRatingByUserAndArtwork(props.userId, props.artworkId));
        dispatch(requestCurrentArtworkAverageRating(props.artworkId))
    }, [dispatch, props.artworkId, props.userId]);


    const submitRating = (value) => {
        dispatch(createRating(props.artworkId, props.userId, value));
    };

    return (
        <>
            {useMemo(() =>
                <div>
                    <div className="row justify-content-center">Your rating: {userRating || "not rated"} </div>
                    <div className="row justify-content-center">
                        <Rating
                            name="size-large"
                            value={currentAverageRating || 0}
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                            onChange={(event, newValue) => submitRating(newValue)}
                            readOnly={userRating || 0}
                        />
                    </div>
                    <div className="row justify-content-center">
                        Average: {parseFloat(currentAverageRating).toFixed(1)}
                    </div>
                </div>, [currentAverageRating, submitRating, userRating])}
        </>
    )
};

export default RatingComponent;