import { httpGet, httpPost, httpDelete } from "./httpClient.js";

export function getIsFollowingTag(tagName, userId) {
    return httpGet(`tagFollow/${tagName}/user/${userId}`);
}
export function getFollowedTagsByUserId(userId) {
    return httpGet(`tagFollow/user/${userId}`);
}

export function followTagByUser(tagName, userId) {
    return httpPost(`tagFollow/${tagName}/user/${userId}`, { tagName, userId });
}

export function unfollowTagByUser(tagName, userId) {
    return httpDelete(`tagFollow/${tagName}/user/${userId}`, { tagName, userId });
}