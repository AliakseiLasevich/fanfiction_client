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

let userId = localStorage.getItem("userId");
let jwt = localStorage.getItem("jwt");

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


export const artworkAPI = {
    postArtwork(artwork) {
        return instance.post(`/users/${userId}/artworks`, artwork, {headers: getHeaders(jwt)})
    },
    getArtworksPreviews(page = 1, limit = 4) {
        return instance.get(`/artworksPreviews?page=${page}&limit=${limit}`)
    },
    getArtworksByUser(userId) {
        return instance.get(`/users/${userId}/artworks`, {headers: getHeaders(jwt)})
    },
    getArtworkById(artworkId) {
        return instance.get(`/artworks/${artworkId}`)
    }

};

export const cloudinaryApi = {
    upload(data) {
        return axios.post("https://api.cloudinary.com/v1_1/du6tyqkom/image/upload", data)
    }
};