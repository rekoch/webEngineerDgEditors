import { httpGet, httpPost, httpDelete } from "./httpClient.js";

export function getIsFollowingAuthor(authorEmail, userId) {
    return httpGet(`authorFollow/${authorEmail}/user/${userId}`);
}
export function getFollowedAuthorsByUserId(userId) {
    return httpGet(`authorFollow/user/${userId}`);
}

export function followAuthorByUser(authorEmail, userId) {
    return httpPost(`authorFollow/${authorEmail}/user/${userId}`, { authorEmail, userId });
}

export function unfollowAuthorByUser(authorEmail, userId) {
    return httpDelete(`authorFollow/${authorEmail}/user/${userId}`, { authorEmail, userId });
}