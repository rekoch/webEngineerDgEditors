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

function getIsFollowingAuthor(authorEmail, userId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM authorFollow WHERE userId = ? AND authorEmail = ?', [userId, authorEmail], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row);
            }
        });
    });
}

function followAuthorByUser(authorEmail, userId) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO authorFollow (authorEmail, userId) VALUES (?, ?)', [authorEmail, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
}

function unfollowAuthorByUser(authorEmail, userId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM authorFollow WHERE authorEmail = ? AND userId = ?', [authorEmail, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
}

module.exports = {
    getFollowedAuthorsByUserId,
    getIsFollowingAuthor,
    followAuthorByUser,
    unfollowAuthorByUser
};