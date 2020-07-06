import React from "react";
import {FaRegImage, FaTrashAlt} from "react-icons/fa";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {removeChapterAndIndex, removeImageAc, uploadImageToChapter} from "../../../../redux/chapterReducer";

const ChapterTools = (props) => {

    const imgUrl = useSelector(state => {
        return state.chapterReducer.chapters[props.index].imgUrl
    });

    const dispatch = useDispatch();

    const removeChapter = (index) => {
        dispatch(removeChapterAndIndex(index));
    };

    const uploadImage = (image) => {
        dispatch(uploadImageToChapter(image, props.index))
    };

    const removeImage = () => {
      dispatch(removeImageAc(props.index))
    };

    return (
        <>
            {imgUrl &&
            <div className="d-block align-middle btn" onClick={() => {
                removeImage()
            }}>
                <img src={imgUrl}/>
                <p>Click to remove</p>
            </div>}

            <div className="d-flex justify-content-center">
                <Dropzone onDrop={acceptedFiles => uploadImage(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()} className="d-inline-block">
                                <div className="btn btn-warning m-2"><span className="mr-1"><FaRegImage/></span>
                                    <input {...getInputProps()}  />
                                    "Drag image here"
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>

                <div className="btn btn-warning m-2" onClick={() => removeChapter(props.index)}><span
                    className="mr-1"><FaTrashAlt/></span>Remove chapter
                </div>

            </div>
        </>
    )
};

export default ChapterTools;