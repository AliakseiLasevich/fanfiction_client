import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = (props) => {

    return (
        <div className="container">
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
                    <div className="container">
                        <NavLink className="navbar-brand" to="/">Fanfic</NavLink>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">

                                {!props.logged &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>}

                                {!props.logged && <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>}

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <button onClick={() => {alert(props.logged)}}>aaaa</button>
        </div>
    )
};

export default Navbar;