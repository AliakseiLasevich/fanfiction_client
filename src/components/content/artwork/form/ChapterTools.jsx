import React, {useState} from "react";
import {FaRegImage, FaTrashAlt} from "react-icons/fa";
import Dropzone from "react-dropzone";
import * as axios from "axios";
import {useDispatch} from "react-redux";
import {recalculateChaptersIndexes, removeChapterAC, removeChapterAndIndex} from "../../../../redux/chapterReducer";

const ChapterTools = (props) => {

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async files => {
        setLoading(true);
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'fanfic');
        axios.post("https://api.cloudinary.com/v1_1/du6tyqkom/image/upload", data)
            .then(response => {
                const uploadedFile = response.data.secure_url;
                setImage(uploadedFile);
            })
            .then(setLoading(false));
    };

    const dispatch = useDispatch();

    const removeChapter = (index) => {
        dispatch(removeChapterAndIndex(index));
    };


    return (
        <>
            {image &&
            <div className="d-block align-middle btn" onClick={() => {
                setImage(null)
            }}>
                <img src={image}/>
                <p>Click to remove</p>
            </div>}

            <div className="d-flex justify-content-center">
                <Dropzone onDrop={acceptedFiles => uploadImage(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()} className="d-inline-block">
                                <div className="btn btn-warning m-2"><span className="mr-1"><FaRegImage/></span>
                                    <input {...getInputProps()}  />
                                    {loading ? "Loading" : "Drag image here"}
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