import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Redirect} from "react-router-dom";

const Search = (props) => {
    const [textToSearch, setTextToSearch] = useState(null);
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = ({searchText}) => {
        setTextToSearch(searchText);
        setTextToSearch("");
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="col-5">
                <input className="form-control" type="text" name="searchText" placeholder="Search"
                       ref={register({required: "Input text please"})}/>
            </form>

            {textToSearch && <Redirect to={`/search/text/${textToSearch}`}/>}
        </div>
    )
};

export default Search;