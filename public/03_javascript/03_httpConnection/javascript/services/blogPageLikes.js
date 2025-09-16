import { httpGet, httpPost, httpDelete } from "./httpClient.js";

export function getLikesPerBlogPage(blogPageId) {
    return httpGet(`likes/${blogPageId}`);
}

export function likeBlogPage(blogPageId, userId) {
    return httpPost(`likes/${blogPageId}`, { blogPageId, userId }).then(() => {
        return getLikesPerBlogPage(blogPageId);
    });
}

export function unlikeBlogPage(blogPageId, userId) {
    return httpDelete(`likes/${blogPageId}`, { blogPageId, userId });
}