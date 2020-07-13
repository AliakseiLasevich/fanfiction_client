import React, {useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {getArtworksPreviewsBySearch} from "../../redux/artworkReducer";
import {useDispatch, useSelector} from "react-redux";
import ArtworkPreview from "./artwork/ArtworkPreview";

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const {path} = useRouteMatch();
    let match = useRouteMatch({
        path: path,
        strict: true,
        sensitive: true
    });
    const textToSearch = match.params.textToSearch;

    useEffect(() => {
        dispatch(getArtworksPreviewsBySearch(textToSearch));
    }, [textToSearch]);

    const artworksPreviews = useSelector(state => {
        return state.artworkReducer.artworksPreviews;
    });

    const artworkComponents = artworksPreviews.map(artwork => <ArtworkPreview key={artwork.artworkId}
                                                                              artworkId={artwork.artworkId}
                                                                              authorId={artwork.authorId}
                                                                              authorName={artwork.authorName}
                                                                              name={artwork.name}
                                                                              summary={artwork.summary}


    />);
    return (
        <div>
            <div className="row justify-content-center m-1 p-1">
                <h2>Search results of "{textToSearch}":</h2>
            </div>
            <div>
                {artworksPreviews.length > 0 ?
                    artworkComponents :
                    <div class="alert alert-warning text-center">
                        <strong>No results</strong>
                    </div>}
            </div>
        </div>
    )

};

export default SearchResults;