const { createRouter, asyncHandler } = require("../utils/routerBase");
const {getCountOfLikesByBlogPageId, getLikeStateByUserIdAndBlogPageId, likeBlogPageByUser, unlikeBlogPageByUser } = require("../db/blogPageLikesRepo");

const router = createRouter();

/* GET likes count for a blog page */
router.get("/:blogPageId", asyncHandler(async (req, res) => {
  const blogPageId = req.params.blogPageId;
  const likeCount = await getCountOfLikesByBlogPageId(blogPageId);
  res.send({ likeCount });
}));

/* GET like state for a blog page by a user */
router.get("/state/:blogPageId/user/:userId", asyncHandler(async (req, res) => {
  const blogPageId = req.params.blogPageId;
  const userId = req.params.userId;
  
  const isLiked = await getLikeStateByUserIdAndBlogPageId(userId, blogPageId);
  res.send({ liked: isLiked });
}));

/* POST like a blog page by a user */
router.post("/:blogPageId", asyncHandler(async (req, res) => {
  const blogPageId = req.body.blogPageId;
  const userId = req.body.userId;
  
  console.log("Liking blog page:", blogPageId, "by user:", userId);
  const result = await likeBlogPageByUser(blogPageId, userId);
  res.send(result);
}));

/* DELETE unlike a blog page by a user */
router.delete("/:blogPageId", asyncHandler(async (req, res) => {
  const blogPageId = req.body.blogPageId;
  const userId = req.body.userId;
  
  const result = await unlikeBlogPageByUser(blogPageId, userId);
  res.send(result);
}));

module.exports = router;
