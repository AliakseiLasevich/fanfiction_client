import React, {useEffect, useState} from "react";
import Sidebar from "../sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getArtworksPreviews} from "../../redux/artworkReducer";
import Paginator from "./Paginator";
import ArtworkPreviewsList from "./artwork/ArtworkPreviewsList";

const MainPageArtworksPreviews = (props) => {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const artworksPreviews = useSelector(state => {
        return state.artworkReducer.artworksPreviews;
    });

    useEffect(() => {
        dispatch(getArtworksPreviews(currentPage));
    }, [currentPage]);

    return (
        <div className="row">
            <div className="align-self-center p-4 col-9">
                <ArtworkPreviewsList artworksPreviews={artworksPreviews}/>
                <Paginator setCurrentPage={setCurrentPage}/>
            </div>
            <div className="align-self-baseline p-4 col-3"><Sidebar/></div>
        </div>

    )
};

export default withRouter(MainPageArtworksPreviews);