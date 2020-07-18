import React from "react";

const NameInput = (props) => {

    return (
        <div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name"
                       ref={props.register({required: "Please input name"})}
                       defaultValue={props.name}/>
                <div className="text-danger">  {props.errors.name && <span>{props.errors.name.message}</span>}</div>
            </div>
        </div>
    )
};

export default NameInput;