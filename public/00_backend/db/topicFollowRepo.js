const db = require('./db');

function getFollowedTopicsByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM topicFollow WHERE userId = ?', [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getIsUserFollowingTopic(topicName, userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM topicFollow WHERE userId = ? AND topicName = ?', [userId, topicName], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row);
            }
        });
    });
}

function followTopicByUser(topicName, userId) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO topicFollow (topicName, userId) VALUES (?, ?)', [topicName, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
}

function unfollowTopicByUser(topicName, userId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM topicFollow WHERE topicName = ? AND userId = ?', [topicName, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });}

module.exports = {
    getFollowedTopicsByUserId,
    getIsUserFollowingTopic,
    followTopicByUser,
    unfollowTopicByUser
};