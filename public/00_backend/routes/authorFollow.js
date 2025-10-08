const express = require("express");
const { asyncHandler } = require("../utils/routerBase");
const router = express.Router();

var {
  getFollowedAuthorsByUserId,
  getIsFollowingAuthor,
  followAuthorByUser,
  unfollowAuthorByUser,
} = require("../db/authorFollowRepo");

/**
 * @swagger
 * /author-follow/user/{userId}:
 *   get:
 *     summary: Retrieve a list of followed authors for a user
 *     tags: [Author Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of followed authors
 */
router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const followedAuthors = await getFollowedAuthorsByUserId(userId);
    res.send({ followedAuthors });
  })
);

/**
 * @swagger
 * /author-follow/{authorEmail}/user/{userId}:
 *   get:
 *     summary: Check if user is following an author
 *     tags: [Author Follow]
 *     parameters:
 *       - in: path
 *         name: authorEmail
 *         required: true
 *         description: The email of the author
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow status
 */
router.get(
  "/:authorEmail/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const authorEmail = req.params.authorEmail;

    const isFollowedAuthor = await getIsFollowingAuthor(authorEmail, userId);
    res.send({ isFollowedAuthor });
  })
);

/**
 * @swagger
 * /author-follow/{authorEmail}/user/{userId}:
 *   post:
 *     summary: Follow an author
 *     tags: [Author Follow]
 *     parameters:
 *       - in: path
 *         name: authorEmail
 *         required: true
 *         description: The email of the author to follow
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow operation result
 */
router.post(
  "/:authorEmail/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const authorEmail = req.params.authorEmail;

    const result = await followAuthorByUser(authorEmail, userId);
    res.send(result);
  })
);

/**
 * @swagger
 * /author-follow/{authorEmail}/user/{userId}:
 *   delete:
 *     summary: Unfollow an author
 *     tags: [Author Follow]
 *     parameters:
 *       - in: path
 *         name: authorEmail
 *         required: true
 *         description: The email of the author to unfollow
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unfollow operation result
 */
router.delete(
  "/:authorEmail/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const authorEmail = req.params.authorEmail;

    const result = await unfollowAuthorByUser(authorEmail, userId);
    res.send(result);
  })
);

module.exports = router;
