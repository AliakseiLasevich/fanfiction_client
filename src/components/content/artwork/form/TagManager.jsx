import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const TagManager = (props) => {

    const handleKeyDown = event => {
        switch (event.key) {
            case ",":
            case " ": {
                event.preventDefault();
                event.stopPropagation();
                if (event.target.value.length > 0) {
                    props.setTags([...props.tags, event.target.value]);
                }
                break;
            }
            default:
        }
    };

    return (
        <div style={{width: 500}}>
            <Autocomplete
                multiple
                freeSolo
                id="tags-outlined"
                options={props.allTags}
                getOptionLabel={option => option.tag || option}
                value={props.tags}
                onChange={(event, newValue) => props.setTags(newValue)}
                filterSelectedOptions
                renderInput={params => {
                    params.inputProps.onKeyDown = handleKeyDown;
                    return (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Input tags here"
                            margin="normal"
                            fullWidth
                        />
                    );
                }}
            />
        </div>
    );
};

export default TagManager;
