import React from "react";

const SummaryInput = (props) => {

    return (
        <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <input className="form-control" type="text" name="summary"
                   ref={props.register({required: "Please input currentArtworkSummary"})}
                   defaultValue={props.summary}/>
            <div className="text-danger">  {props.errors.summary && <span>{props.errors.summary.message}</span>}</div>
        </div>
    )
};

export default SummaryInput;