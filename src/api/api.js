import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


export const usersAPI = {
    login(user) {
        return instance.post("/users/login", user);
    },
    getUsers({jwt}) {
        return instance.get("users");
    },
    getUserById(userId) {
        return instance.get(`users/${userId}`)
    },
    postUser({firstName, lastName, email, password}) {
        return instance.post("users/", {
            firstName,
            lastName,
            email,
            password
        })
    },
    // putFaculty(user) {
    //     return instance.put(`users/${user.id}`,
    //         {name: faculty.name, active: faculty.active})
    // }
};