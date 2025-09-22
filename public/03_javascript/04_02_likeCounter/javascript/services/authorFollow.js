import { httpGet, httpPost, httpDelete } from "./httpClient.js";

export function getIsFollowingAuthor(authorEmail, userId) {
    return httpGet(`author-follow/${authorEmail}/user/${userId}`);
}
export function getFollowedAuthorsByUserId(userId) {
    return httpGet(`author-follow/user/${userId}`);
}

export function followAuthorByUser(authorEmail, userId) {
    return httpPost(`author-follow/${authorEmail}/user/${userId}`, { authorEmail, userId });
}

export function unfollowAuthorByUser(authorEmail, userId) {
    return httpDelete(`author-follow/${authorEmail}/user/${userId}`, { authorEmail, userId });
}