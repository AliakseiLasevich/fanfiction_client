import React from "react";
import {FaTrashAlt, FaRegImage} from "react-icons/fa";

const ChapterTools = (props) => {

    return (
        <div className="d-flex justify-content-center">
            <div className="btn btn-warning m-2 "><span className="mr-1"><FaRegImage/></span>Drag picture here</div>
            <div className="btn btn-warning m-2" onClick={() => props.removeChapterAC(props.index)}><span
                className="mr-1"><FaTrashAlt/></span>Remove chapter
            </div>
        </div>
    )
};

export default ChapterTools;