import React, {useEffect, useState} from "react";
import ArtworkPreview from "./artwork/ArtworkPreview";
import Sidebar from "../sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getArtworksPreviews} from "../../redux/artworkReducer";
import Paginator from "./Paginator";

const Content = (props) => {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const artworksPreviews = useSelector(state => {
        return state.artworkReducer.artworksPreviews;
    });

    useEffect(() => {
        dispatch(getArtworksPreviews(props.match.params.page));
    }, [currentPage]);

    const artworkComponents = artworksPreviews.map(artwork => <ArtworkPreview key={artwork.artworkId}
                                                                              artworkId={artwork.artworkId}
                                                                              authorId={artwork.authorId}
                                                                              authorName={artwork.authorName}
                                                                              name={artwork.name}
                                                                              summary={artwork.summary}
                                                                              creationDate={artwork.creationDate}



    />);

    return (
            <div className="row">
                <div className="align-self-center p-4 col-9">
                    {artworkComponents}
                    <Paginator setCurrentPage={setCurrentPage}/>
                </div>
                <div className="align-self-center p-4 col-3"><Sidebar/></div>
            </div>

    )
};

export default withRouter(Content);