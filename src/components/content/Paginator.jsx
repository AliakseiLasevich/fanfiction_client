import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const Paginator = (props) => {

    const [pagesArray, setPagesArray] = useState([]);

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
        <li className="page-item" onClick={()=>props.setCurrentPage(page)}>
            <NavLink className="page-link" to={`/${page}`}>{page}</NavLink>
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