import React, {useEffect} from 'react';
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import {Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {getUser, setLogged, setUserAndJWT} from "./redux/usersReducer";
import Artwork from "./components/artwork/Artwork";
import Sidebar from "./components/sidebar/Sidebar";
import AdminPanel from "./components/adminPanel/AdminPanel";

function App() {

    const dispatch = useDispatch();
    const logged = useSelector(state => {
        return state.usersReducer.logged
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const jwt = localStorage.getItem("jwt");
        if (userId && jwt) {
            dispatch(setUserAndJWT(userId, jwt));
            dispatch(setLogged(true));
            dispatch(getUser(userId, jwt));
        }
    }, []);

    return (
        <div className="container">
            <Navbar logged={logged}/>

            <Route path="/register" render={() => <RegisterPage/>}/>
            <Route path="/login" render={() => <LoginPage/>}/>


            <Route path="/admin-panel" render={() => <AdminPanel/>}/>



            <Route exact path="/" render={() => <div>
                <div className="d-flex justify-content-center row mx-auto">
                    <button className="btn btn-sm btn-secondary btn-block">New artwork</button>
                </div>

                <div className="d-flex justify-content-around row">
                    <div className="align-self-center p-4 col-10">

                        <Artwork/>
                        <Artwork/>
                        <Artwork/>
                        <Artwork/>
                        <Artwork/>
                        <Artwork/>

                    </div>
                    <div className="align-self-center p-4 col-2"><Sidebar/></div>
                </div>
            </div>
            }/>

        </div>
    )
        ;
}

export default App;
