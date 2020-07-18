import React, {useCallback, useEffect, useState} from "react";
import ChapterForm from "./ChapterForm";
import {useDispatch, useSelector} from "react-redux";
import {setChaptersAC} from "../../../../redux/artworkFormReducer";

const ChaptersManager = (props) => {

    const dispatch = useDispatch();
    const chaptersToEdit = useSelector(state => {
        return state.artworkFormReducer.artworkToEdit?.chapters
    });

    useEffect(() => {
        if (typeof(chaptersToEdit) !== "undefined" && chaptersToEdit !== null && Object.keys(chaptersToEdit).length !== 0) {
           dispatch(setChaptersAC(chaptersToEdit))
        }
    }, [chaptersToEdit]);

    return (
        <div>
            {chaptersToEdit?
                chaptersToEdit.map(chapter => <ChapterForm key={chapter.chapterNumber}
                                                   index={chapter.chapterNumber}
                                                   content={chapter.content}
                                                   title={chapter.title}/>):
            "BLANK FORM"}

            <div className="text-center mt-2">
                {/*<div className="btn btn-secondary" onClick={() => addChapter()}>*/}
                Add chapter
                {/*</div>*/}
            </div>
        </div>
    )
};

export default ChaptersManager;