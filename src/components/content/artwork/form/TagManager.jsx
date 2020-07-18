import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {useSelector} from "react-redux";

const TagManager = (props) => {

        const tagsInBase = useSelector(state => {
            return state.artworkFormReducer.tags;
        });

        const handleKeyDown = event => {
            switch (event.key) {
                case ",":
                case " ": {
                    event.preventDefault();
                    event.stopPropagation();
                    if (event.target.value.length > 0) {
                        props.setTags([...props.tags, {name: event.target.value}]);
                    }
                    break;
                }
                default:
            }
        };

        return (

            <div style={{width: 500}}>
                <label htmlFor="tags">Tags</label>
                <div className="mb-4">
                    <Autocomplete
                        multiple
                        freeSolo
                        id="tags-outlined"
                        options={tagsInBase}
                        getOptionLabel={option => option.name || option}
                        value={props.tags}
                        onChange={(event, newValue) => props.setTags(newValue)}
                        filterSelectedOptions
                        renderInput={params => {
                            params.inputProps.onKeyDown = handleKeyDown;
                            return (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Input tags here. Separate with space button or , sign"
                                    margin="normal"
                                    fullWidth
                                />
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
;

export default TagManager;
