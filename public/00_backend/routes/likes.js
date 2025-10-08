const express = require("express");
const { asyncHandler } = require("../utils/routerBase");
const {getCountOfLikesByBlogPageId, getLikeStateByUserIdAndBlogPageId, likeBlogPageByUser, unlikeBlogPageByUser } = require("../db/blogPageLikesRepo");

const router = express.Router();

/**
 * @swagger
 * /likes/{blogPageId}:
 *   get:
 *     summary: Get likes count for a blog page
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: blogPageId
 *         required: true
 *         description: The ID of the blog page
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The like count for the blog page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likeCount:
 *                   type: integer
 *                   example: 42
 */
router.get("/:blogPageId", asyncHandler(async (req, res) => {
  const blogPageId = req.params.blogPageId;
  const likeCount = await getCountOfLikesByBlogPageId(blogPageId);
  res.send({ likeCount });
}));

/**
 * @swagger
 * /likes/state/{blogPageId}/user/{userId}:
 *   get:
 *     summary: Check if user has liked a blog page
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: blogPageId
 *         required: true
 *         description: The ID of the blog page
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
 *         description: The like state for the user and blog page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   example: true
 */
router.get("/state/:blogPageId/user/:userId", asyncHandler(async (req, res) => {
  const blogPageId = req.params.blogPageId;
  const userId = req.params.userId;
  
  const isLiked = await getLikeStateByUserIdAndBlogPageId(userId, blogPageId);
  res.send({ liked: isLiked });
}));

/**
 * @swagger
 * /likes/{blogPageId}:
 *   post:
 *     summary: Like a blog page
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: blogPageId
 *         required: true
 *         description: The ID of the blog page to like
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blogPageId
 *               - userId
 *             properties:
 *               blogPageId:
 *                 type: string
 *                 example: "123"
 *               userId:
 *                 type: string
 *                 example: "456"
 *     responses:
 *       200:
 *         description: Like operation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/:blogPageId", asyncHandler(async (req, res) => {
  const blogPageId = req.body.blogPageId;
  const userId = req.body.userId;
  
  console.log("Liking blog page:", blogPageId, "by user:", userId);
  const result = await likeBlogPageByUser(blogPageId, userId);
  res.send(result);
}));

/**
 * @swagger
 * /likes/{blogPageId}:
 *   delete:
 *     summary: Unlike a blog page
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: blogPageId
 *         required: true
 *         description: The ID of the blog page to unlike
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blogPageId
 *               - userId
 *             properties:
 *               blogPageId:
 *                 type: string
 *                 example: "123"
 *               userId:
 *                 type: string
 *                 example: "456"
 *     responses:
 *       200:
 *         description: Unlike operation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete("/:blogPageId", asyncHandler(async (req, res) => {
  const blogPageId = req.body.blogPageId;
  const userId = req.body.userId;
  
  const result = await unlikeBlogPageByUser(blogPageId, userId);
  res.send(result);
}));

module.exports = router;
