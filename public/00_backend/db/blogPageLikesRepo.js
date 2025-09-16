const { get } = require('../routes');
const db = require('./db');

function getLikesByUserId(userId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM blogPagesLikes WHERE userId = ?', [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getLikeStateByUserIdAndBlogPageId(userId, blogPageId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM blogPagesLikes WHERE userId = ? AND blogPageId = ?', [userId, blogPageId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row);
            }
        });
    });
}

function getCountOfLikesByBlogPageId(blogPageId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT COUNT(DISTINCT userId) as likeCount FROM blogPagesLikes WHERE blogPageId = ?', [blogPageId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.likeCount);
            }
        });
    });
}

function likeBlogPageByUser(blogPageId, userId) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO blogPagesLikes (blogPageId, userId) VALUES (?, ?)', [blogPageId, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
}

function unlikeBlogPageByUser(blogPageId, userId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM blogPagesLikes WHERE blogPageId = ? AND userId = ?', [blogPageId, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });}

module.exports = {
    getLikesByUserId,
    getLikeStateByUserIdAndBlogPageId,
    getCountOfLikesByBlogPageId,
    likeBlogPageByUser,
    unlikeBlogPageByUser
};