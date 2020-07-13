import React, {useEffect} from 'react';
import Navbar from "./components/header/Navbar";
import RegisterPage from "./components/auth/RegisterPage";
import {Route, Switch, withRouter} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import {useDispatch} from "react-redux";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Content from "./components/content/Content";
import {authorizeUser} from "./redux/authReducer";
import NewArtwork from "./components/content/artwork/form/NewArtwork";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/common/PageNotFound";
import Artwork from "./components/content/artwork/Artwork";
import SearchResults from "./components/content/SearchResults";
import EmailVerificationResult from "./components/auth/EmailVerificationResult";


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

            <Switch>
                <Route path="/register" render={() => <RegisterPage/>}/>
                <Route path="/email-verification/:token" render={() => <EmailVerificationResult/>}/>
                <Route path="/login" render={() => <LoginPage/>}/>
                <Route path="/dashboard" render={() => <Dashboard/>}/>
                <Route path="/admin-panel" render={() => <AdminPanel/>}/>
                <Route exact path={["/", "/artworks/:page"]} render={() => <Content/>}/>
                <Route path="/new-artwork" render={() => <NewArtwork/>}/>
                <Route path="/artworks/id/:artworkId" render={() => <Artwork/>}/>
                <Route exact path="/search/:textToSearch" render={() => <SearchResults/>}/>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
