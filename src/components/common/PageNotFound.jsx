import React from "react";

const PageNotFound = ({location}) => {

    return (
        <div className="alert alert-warning m-3 text-center">
            <strong>Sorry. Page not found <code>{location.pathname}</code></strong>
        </div>
    )
};

export default PageNotFound;