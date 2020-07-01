import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaDoorOpen, FaKey, FaUserCircle} from "react-icons/fa";
import {logoutAC, removeLocalStorageProps, setLogged} from "../redux/authReducer";

const Navbar = () => {
    const dispatch = useDispatch();
    const [adminRole, setAdminRole] = useState(false);

    const logged = useSelector(state => {
        return state.authReducer.logged
    });

    const currentUser = useSelector(state => {
        return state.authReducer.currentUser;
    });

    const logout = () => {
        dispatch(setLogged(false));
        dispatch(logoutAC());
        dispatch(removeLocalStorageProps());
    };

    useEffect(() => {
        hasAdminRole();
    }, [currentUser]);

    const hasAdminRole = () => {
        if (Object.entries(currentUser).length !== 0) {
            setAdminRole(currentUser.roles.some(role => role.name === "ROLE_ADMIN"));
        }
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mx-0 ">
            <NavLink className="navbar-brand" to="/">Fanfic</NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">

                    {!logged &&
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                            <span className="p-1"><FaKey/></span>Register</NavLink>
                    </li>}

                    {!logged && <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            <span className="p-1"><FaDoorOpen/></span>Login</NavLink>
                    </li>}


                    {logged && <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                            <span className="p-1"><FaUserCircle/></span>
                            {currentUser.email}
                        </a>
                        <div className="dropdown-menu">

                            {adminRole && <button onClick={() => {
                            }} className="dropdown-item">
                                <NavLink className="btn btn-sm" to="/admin-panel">
                                    Admin panel
                                </NavLink>
                            </button>}

                            <button onClick={logout} className="dropdown-item">
                                <NavLink className="btn btn-sm" to="/">
                                    Logout
                                </NavLink>
                            </button>
                        </div>
                    </li>}

                </ul>
            </div>

        </nav>

    )
};

export default Navbar;