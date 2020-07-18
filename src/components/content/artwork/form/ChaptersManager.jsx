import React from "react";
import ChapterForm from "./ChapterForm";

const ChaptersManager = (props) => {

    const addChapter = () => {
        const newChapters = [...props.chapters,
            {
                chapterNumber: props.chapters.length,
                content: "",
                title: "",
                imageUrl: ""
            }];
        props.setChapters(newChapters);
    };

    return (
        <div>
            {props.chapters.map(chapter => <ChapterForm key={chapter.chapterNumber}
                                                        index={chapter.chapterNumber}
                                                        content={chapter.content}
                                                        title={chapter.title}
                                                        chapters={props.chapters}
                                                        setChapters={props.setChapters}/>)}

            <div className="text-center mt-2">
                <div className="btn btn-secondary" onClick={() => addChapter()}>
                    Add chapter
                </div>
            </div>
        </div>
    )
};

export default ChaptersManager;