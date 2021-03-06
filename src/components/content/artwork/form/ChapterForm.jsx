import React, {useState} from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import ChapterTools from "./ChapterTools";
import {useDispatch} from "react-redux";
import {addContentAC, addTitleAC} from "../../../../redux/artworkFormReducer";

const ChapterForm = (props) => {
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const onTitleChange = (e) => {
        dispatch(addTitleAC(props.index, e.target.value))
    };

    const onContentChange = (content) => {
        dispatch(addContentAC(props.index, content))
    };

    return (
        <div className="border rounded m-2 px-3 py-2">
            <span><h3>Chapter# {props.index + 1}</h3></span>


            <div className="form-group">
                <label htmlFor="name">Title</label>
                <input className="form-control" onChange={onTitleChange} type="text" name="title"
                       defaultValue={props.title}/>
            </div>

            <ReactMde
                toolbarCommands={[["header"], ["bold", "italic", "strikethrough"], ["quote"]]}
                loadingPreview={true}
                value={props.content}
                onChange={onContentChange}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }/>

            <div className="text-center mt-2">
                <ChapterTools
                    index={props.index}/>
            </div>
        </div>
    )
};

export default ChapterForm;