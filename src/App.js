import React, {useEffect} from 'react';
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import {Route, withRouter} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import {useDispatch} from "react-redux";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Content from "./components/content/Content";
import {authorizeUser} from "./redux/authReducer";
import NewArtwork from "./components/content/artwork/form/NewArtwork";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        let userId = localStorage.getItem("userId");
        let jwt = localStorage.getItem("jwt");
        if (userId && jwt) {
            dispatch(authorizeUser(userId, jwt));
        }
    }, []);

    return (
        <div className="container">
            <Navbar/>
            <Route path="/register" render={() => <RegisterPage/>}/>
            <Route path="/login" render={() => <LoginPage/>}/>
            <Route path="/admin-panel" render={() => <AdminPanel/>}/>
            <Route exact path="/" render={() => <Content/>}/>
            <Route path="/new-artwork" render={() => <NewArtwork/>}/>
        </div>
    );
}

export default withRouter(App);
