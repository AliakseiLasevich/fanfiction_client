import React, {useEffect} from "react";
import {getArtworksPreviewsBySearch, requestArtworkPreviewsByTag} from "../../../redux/artworkReducer";
import {useDispatch, useSelector} from "react-redux";
import ArtworkPreviewsList from "../artwork/ArtworkPreviewsList";

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const textToSearch = props.match.params.textToSearch;
    const tagToSearch = props.match.params.tagToSearch;

    useEffect(() => {
        dispatch(getArtworksPreviewsBySearch(textToSearch));
    }, [textToSearch]);

    useEffect(() => {
        dispatch(requestArtworkPreviewsByTag(tagToSearch));
    }, [tagToSearch]);

    const artworksPreviews = useSelector(state => {
        return state.artworkReducer.artworksPreviews;
    });

    return (
        <div>
            <div className="row justify-content-center m-1 p-1">
                {textToSearch && <h2>Search results of "{textToSearch}":</h2>}
                {tagToSearch && <h2>Search results of tag "{tagToSearch}":</h2>}
            </div>
            <div>
                {artworksPreviews.length > 0 ?
                    <ArtworkPreviewsList artworksPreviews={artworksPreviews}/> :
                    <div class="alert alert-warning text-center">
                        <strong>No results</strong>
                    </div>}
            </div>
        </div>
    )

};

export default SearchResults;