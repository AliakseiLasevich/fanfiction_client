import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/"
});

const getHeaders = (jwt) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': jwt
    }
};

export const usersAPI = {
    login(user) {
        return instance.post("/users/login", user);
    },
    getUsers(jwt) {
        return instance.get("/users", {headers: getHeaders(jwt)});
    },
    getUserById(userId, jwt) {
        return instance.get(`/users/${userId}`, {headers: getHeaders(jwt)})
    },
    postUser(user) {
        return instance.post("/users", user)
    }
};