import axios from 'axios';
import {useEffect} from "react";

const api = axios.create({baseURL:"http://localhost:8080"});

//זה מבחינת USERS
export function register(username, password){
    return api.post("/api/users/register", { username, password });
}

export function login(username, password) {
    return api.post("/api/users/login", { username, password });
}

export function getAllUsers() {
    return api.get("/api/users/all");
}
export function searchUsers(text) {
    return api.get("/api/users/search", { params: { text } });
}

export function updateProfileImage(userId, imageUrl) {
    return api.put("/api/users/profile-image", { userId, imageUrl });
}

//זה מבחינת POSTS

export function createPost(authorUserId, text) {
    return api.post("/api/posts/create", { authorUserId, text });
}

export function getPostsByUser(userId) {
    return api.get(`/api/posts/by-user/${userId}`);
}

export function getFeed(userId) {
    return api.get(`/api/posts/feed/${userId}`);
}

//זה מבחינת FOLLOWERS

export function follow(followerUserId, followedUserId) {
    return api.post("/api/followers/follow", null, {
        params: { followerUserId, followedUserId },
    });
}


export function unfollow(followerUserId, followedUserId) {
    return api.post("/api/followers/unfollow", null, {
        params: { followerUserId, followedUserId },
    });
}

export function getFollowing(userId) {
    return api.get(`/api/followers/following/${userId}`);
}

export function getFollowers(userId) {
    return api.get(`/api/followers/followers/${userId}`);
}


export function isFollowing(followerUserId, followedUserId) {
    return api.get("/api/followers/is-following", {
        params: { followerUserId, followedUserId },
    });
}

export default api;