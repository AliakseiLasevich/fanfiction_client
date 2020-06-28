import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import {Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import {useSelector} from "react-redux";

function App() {

    const logged = useSelector(state => {
        return state.loginReducer.logged
    });

    return (
        <div className="container">
            <Navbar logged={logged}/>

            <Route path="/register" render={() => <RegisterPage/>}/>
            <Route path="/login" render={() => { return (!logged && <LoginPage/>)}}/>


            <div className="d-flex justify-content-around row">
                <div className="align-self-center p-4 ">Left column</div>
                <div className="align-self-center p-4">Right column</div>
            </div>
        </div>
    );
}

export default App;
