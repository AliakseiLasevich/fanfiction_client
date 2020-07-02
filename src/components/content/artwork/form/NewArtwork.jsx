import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useForm} from "react-hook-form";
import {login} from "../../../../redux/authReducer";
import TagManager from "./TagManager";


const NewArtwork = () => {

    const [value, setValue] = React.useState("**Type here**");
    const [selectedTab, setSelectedTab] = React.useState("write");
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (artwork) => {
        alert("submit")
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 m-3">
            <h3 className="text-center">New artwork</h3>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name"
                       ref={register({required: "Please input name"})}/>
                <div className="text-danger">  {errors.name && <span>{errors.name.message}</span>}</div>
            </div>

            <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input className="form-control" type="text" name="summary"
                       ref={register({required: "Please input summary"})}/>
                <div className="text-danger">  {errors.summary && <span>{errors.summary.message}</span>}</div>
            </div>

            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select className="form-control" type="text" name="genre"
                        ref={register({required: "Please select genre"})}>
                    <option></option>
                    <option value="fantasy"> Fantasy</option>
                    <option value="erotic"> Erotic</option>
                </select>
                <div className="text-danger">  {errors.genre && <span>{errors.genre.message}</span>}</div>
            </div>

            <label htmlFor="tags">Tags</label>
            <div className="mb-4">
                <TagManager/>
            </div>

            <ReactMde
                toolbarCommands={[["header"], ["bold", "italic", "strikethrough"], ["quote"]]}
                loadingPreview={true}
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
            <div className="text-center m-4"><button className="btn btn-success w-25">Submit</button></div>
        </form>
    )
};

export default NewArtwork;