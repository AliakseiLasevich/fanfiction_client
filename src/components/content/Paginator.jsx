import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {NavLink, useRouteMatch} from "react-router-dom";

const Paginator = (props) => {

    const [pagesArray, setPagesArray] = useState([]);
    const {url, path} = useRouteMatch();

    const pagesCount = useSelector(state => {
        return state.artworkReducer.pagesCount;
    });

    useEffect(() => {
        const newArray = [];
        for (let i = 0; i < pagesCount; i++) {
            newArray[i] = i + 1;
        }
        setPagesArray(newArray);
    }, [pagesCount]);

    const paginator = pagesArray.map(page =>
        <li className="page-item" onClick={()=>props.setCurrentPage(page)} key={page}>
            <NavLink className="page-link" to={`/artworks/${page}`}> {page}</NavLink>
        </li>);

    return (
        <div>
            <ul className="pagination">
                {paginator}
            </ul>
        </div>
    )
};

export default Paginator;