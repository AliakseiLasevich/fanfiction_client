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
    },
    putUser(user, jwt) {
        return instance.put(`/users/${user.userId}`, user, {headers: getHeaders(jwt)})
    },
    deleteUser(userId, jwt) {
        return instance.delete(`/users/${userId}`, {headers: getHeaders(jwt)})
    }
};

export const cloudinaryApi = {

    upload(data) {
        return axios.post("https://api.cloudinary.com/v1_1/du6tyqkom/image/upload", data)
    }
};