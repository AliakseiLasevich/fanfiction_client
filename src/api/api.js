import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/"
});
let userId = localStorage.getItem("userId");
let jwt = localStorage.getItem("jwt");

const getHeaders = (jwt) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': jwt
        }
    };
};

export const emailVerificationApi = {
    verify(token) {
        return instance.get(`/users/email-verification?token=${token}`)
    }
};


export const usersAPI = {
    login(user) {
        return instance.post("/users/login", user);
    },
    getUsers(jwt) {
        return instance.get("/users", getHeaders(jwt));
    },
    getUserById(userId, jwt) {
        return instance.get(`/users/${userId}`, getHeaders(jwt))
    },
    postUser(user) {
        return instance.post("/users", user)
    },
    putUser(user, jwt) {
        return instance.put(`/users/${user.userId}`, user, getHeaders(jwt))
    },
    deleteUser(userId, jwt) {
        return instance.delete(`/users/${userId}`, getHeaders(jwt))
    }
};


export const artworkAPI = {
    getArtworksPreviews(page = 1, limit = 4) {
        return instance.get(`/artworksPreviews?page=${page}&limit=${limit}`)
    },
    getArtworksByUser(userId) {
        return instance.get(`/users/${userId}/artworks`, getHeaders(jwt))
    },
    getArtworkById(artworkId) {
        return instance.get(`/artworks/${artworkId}`)
    },
    getArtworksPreviewsBySearch(textToSearch) {
        return instance.get(`/search?search=${textToSearch}`)
    },
    getTags() {
        return instance.get(`/tags`, getHeaders(jwt))
    },
    getGenres() {
        return instance.get(`/genres`, getHeaders(jwt))
    },
    postArtwork(artwork) {
        return instance.post(`/users/${userId}/artworks`, artwork, getHeaders(jwt))
    },
    putArtwork(artwork, artworkId) {
        return instance.put(`/users/${userId}/artworks/${artworkId}`, artwork, getHeaders(jwt))
    }
};

export const likeApi = {
    getLike(userId, artworkId) {
        return instance.get(`/likes/${userId}/${artworkId}`, getHeaders(jwt))
    },
    postLike(userId, artworkId, chapterNumber, like) {
        return instance.post(`/likes/${userId}/${artworkId}/${chapterNumber}`, like, getHeaders(jwt))
    },
    putLike(userId, artworkId, chapterNumber, like) {
        return instance.put(`/likes/${userId}/${artworkId}/${chapterNumber}`, like, getHeaders(jwt))
    },
};

export const cloudinaryApi = {
    upload(data) {
        return axios.post("https://api.cloudinary.com/v1_1/du6tyqkom/image/upload", data)
    }
};