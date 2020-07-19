import React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";

const RatingComponent = () => {

    return (
        <>
            <div className="text-center"><h3>Please rate artwork.</h3></div>
            <div className="row justify-content-center">
                <Rating
                    name="size-large"
                    defaultValue={0}
                    precision={1}
                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    onChange={(event, newValue) => alert(newValue)}
                />
            </div>
        </>
    )
};

export default RatingComponent;