import { httpGet, httpPost, httpDelete } from "./httpClient.js";

export function getIsFollowingTopic(topicName, userId) {
    return httpGet(`topic-follow/${topicName}/user/${userId}`);
}
export function getFollowedTopicsByUserId(userId) {
    return httpGet(`topic-follow/user/${userId}`);
}

export function followTopicByUser(topicName, userId) {
    return httpPost(`topic-follow/${topicName}/user/${userId}`, { topicName, userId });
}

export function unfollowTopicByUser(topicName, userId) {
    return httpDelete(`topic-follow/${topicName}/user/${userId}`, { topicName, userId });
}