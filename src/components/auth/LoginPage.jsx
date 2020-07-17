import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "../../redux/authReducer";

const LoginPage = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const logged = useSelector(state => {
        return state.authReducer.logged
    });

    const onSubmit = ({email, password}) => {
        let user = {email, password};
        dispatch(login(user));
    };

    return (
        <div className="container p-2 m-3 mx-auto bg-white w-50 border">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="email" name="email"
                               ref={register({required: "Input email please"})}/>
                        <div className="text-danger">  {errors.email && <span>{errors.email.message}</span>}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password"
                               ref={register({required: "Input password please"})}/>
                        <div className="text-danger">  {errors.password && <span>{errors.password.message}</span>}</div>
                    </div>

                    <div>
                        <input type="submit" value="Login"/>

                    </div>
                </div>
            </form>
            {logged && <Redirect to="/"/>}
        </div>
    )
};

export default LoginPage;