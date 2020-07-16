import React, {useState} from "react";
import {FaThumbsUp} from "react-icons/fa";

const LikeButton = (props) => {
    const [like, setLike] = useState(true);

    return (
        <div>
            {like ? <FaThumbsUp size={32} color="blue"/> : <FaThumbsUp size={32} color="grey"/> }
        </div>
    )
};

export default LikeButton;