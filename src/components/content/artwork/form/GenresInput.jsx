import React, {useCallback} from "react";
import {useSelector} from "react-redux";

const GenresInput = (props) => {

    const genresInBase = useSelector(state => {
        return state.artworkFormReducer.genres
    });

    const convertedGenresToOptions = (genres) => {
        if (genres) {
            return genres.map(genre => <option value={`${genre.name}`}>{genre.name}</option>)
        }
    };

    const genresInput = useCallback(
        () => {
            return (
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-control" name="genre" ref={props.register({required: "Please select genre"})}
                            value={props.genre} onChange={(e) => props.setGenre(e.target.value)}>
                        <option></option>
                        {convertedGenresToOptions(genresInBase)}
                    </select>
                    <div className="text-danger">  {props.errors.genre && <span>{props.errors.genre.message}</span>}</div>
                </div>
            )
        },
        [props.errors.genre, props.genre, genresInBase, props.register],
    );

    return (
        <div>
            {genresInput()}
        </div>
    )
};

export default GenresInput;