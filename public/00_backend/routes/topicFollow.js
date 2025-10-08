const express = require("express");
const { asyncHandler } = require("../utils/helper");

const {
    getFollowedTopicsByUserId,
    getIsUserFollowingTopic,
    followTopicByUser,
    unfollowTopicByUser
} = require("../db/topicFollowRepo");

const router = express.Router();

/**
 * @swagger
 * /topic-follow/user/{userId}:
 *   get:
 *     summary: Get all topics followed by a user
 *     tags: [Topic Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of topics followed by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 followedTopics:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: [{"topicName": "Technology"}, {"topicName": "Science"}]
 */
router.get("/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const followedTopics = await getFollowedTopicsByUserId(userId);
  res.send({ followedTopics });
}));

/**
 * @swagger
 * /topic-follow/{topicName}/user/{userId}:
 *   get:
 *     summary: Check if user is following a topic
 *     tags: [Topic Follow]
 *     parameters:
 *       - in: path
 *         name: topicName
 *         required: true
 *         description: The name of the topic
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
 *         description: Follow status for the topic and user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFollowedTopic:
 *                   type: boolean
 *                   example: true
 */
router.get("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const isFollowedTopic = await getIsUserFollowingTopic(topicName, userId);
  res.send({ isFollowedTopic });
}));

/**
 * @swagger
 * /topic-follow/{topicName}/user/{userId}:
 *   post:
 *     summary: Follow a topic
 *     tags: [Topic Follow]
 *     parameters:
 *       - in: path
 *         name: topicName
 *         required: true
 *         description: The name of the topic to follow
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;
  
  const result = await followTopicByUser(topicName, userId);
  res.send(result);
}));

/**
 * @swagger
 * /topic-follow/{topicName}/user/{userId}:
 *   delete:
 *     summary: Unfollow a topic
 *     tags: [Topic Follow]
 *     parameters:
 *       - in: path
 *         name: topicName
 *         required: true
 *         description: The name of the topic to unfollow
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const result = await unfollowTopicByUser(topicName, userId);
  res.send(result);
}));

module.exports = router;
