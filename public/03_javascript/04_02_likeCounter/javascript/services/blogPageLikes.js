import { httpGet, httpPost, httpDelete } from "./httpClient.js";

export function getLikesPerBlogPage(blogPageId) {
    return httpGet(`likes/${blogPageId}`);
}

export function getLikeStatePerBlogPage(blogPageId, userId) {
    return httpGet(`likes/state/${blogPageId}/user/${userId}`);
}

export function likeBlogPage(blogPageId, userId) {
    return httpPost(`likes/${blogPageId}`, { blogPageId, userId });
}

export function unlikeBlogPage(blogPageId, userId) {
    return httpDelete(`likes/${blogPageId}`, { blogPageId, userId });
}