import React from "react";
import {useForm} from "react-hook-form";

const RegisterPage = (props) => {
    const {register, handleSubmit, errors, watch} = useForm();

    const onSubmit = ({firstName, lastName, email, password, replyPassword}) => {
        const newUser = {firstName, lastName, email, password};
    };

    return (
        <div className="container p-2 bg-white w-50 border">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Register new user</h2>
                <div className="form-group w-50">
                    <label htmlFor="firstName">First name</label>
                    <input className="form-control" type="text" name="firstName"
                           ref={register({required: "Input first name please"})}/>
                    <div className="text-danger">  {errors.firstName &&
                    <span>{errors.firstName.message}</span>}</div>
                </div>

                <div className="form-group w-50">
                    <label htmlFor="lastName">Last name</label>
                    <input className="form-control" type="text" name="lastName"
                           ref={register({required: "Input last name please"})}/>
                    <div className="text-danger">{errors.lastName && <span>{errors.lastName.message}</span>}</div>
                </div>

                <div className="form-group w-50">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email"
                           ref={register({required: "Input email please"})}/>
                    <div className="text-danger">  {errors.email && <span>{errors.email.message}</span>}</div>
                </div>

                <div className="form-group w-50">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password"
                           ref={register({required: "Input password please"})}/>
                    <div className="text-danger">  {errors.password && <span>{errors.password.message}</span>}</div>
                </div>

                <div className="form-group w-50">
                    <label htmlFor="replyPassword">Reply Password</label>
                    <input className="form-control" type="password" name="replyPassword"
                           ref={register(
                               {validate: value => value === watch('password') || "Password not matches"})}/>
                    <div className="text-danger">  {errors.replyPassword &&
                    <span>{errors.replyPassword.message}</span>}</div>
                </div>
                <div>
                    <input type="submit" value="Register"/>

                </div>

            </form>

        </div>
    )
};

export default RegisterPage;