const db = require('./db');

function getFollowedAuthorsByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM authorFollow WHERE userId = ?', [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getIsFollowingAuthor(authorId, userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM authorFollow WHERE userId = ? AND authorId = ?', [userId, authorId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row);
            }
        });
    });
}

function followAuthorByUser(authorId, userId) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO authorFollow (authorId, userId) VALUES (?, ?)', [authorId, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
}

function unfollowAuthorByUser(authorId, userId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM authorFollow WHERE authorId = ? AND userId = ?', [authorId, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });}

module.exports = {
    getFollowedAuthorsByUserId,
    getIsFollowingAuthor,
    followAuthorByUser,
    unfollowAuthorByUser
};