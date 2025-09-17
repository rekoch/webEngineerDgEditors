const { createRouter } = require("../utils/routerBase");
const {getCountOfLikesByBlogPageId, getLikeStateByUserIdAndBlogPageId, likeBlogPageByUser, unlikeBlogPageByUser } = require("../db/blogPageLikesRepo");

const router = createRouter();

/* GET likes count for a blog page */
router.get("/:blogPageId", asyncHandler(async (req, res) => {
  const blogPageId = req.params.blogPageId;
  const likeCount = await getCountOfLikesByBlogPageId(blogPageId);
  
  responseHelper.success(res, { likeCount }, 'Likes fetched successfully');
}));

/* GET like state for a blog page by a user */
router.get("/state/:blogPageId/user/:userId", async function (req, res, next) {
  const blogPageId = req.params.blogPageId;
  const userId = req.params.userId;
  try {
    const isLiked = await getLikeStateByUserIdAndBlogPageId(userId, blogPageId);
    res.send({ liked: isLiked });
  } catch (error) {
    console.error("Error fetching like state:", error);
    next(error);
  }
});


/* POST like a blog page by a user */
router.post("/:blogPageId", async function (req, res, next) {
  const blogPageId = req.body.blogPageId;
  const userId = req.body.userId;
  console.log("Liking blog page:", blogPageId, "by user:", userId);
  try {
    const result = await likeBlogPageByUser(blogPageId, userId);
    res.send(result);
  } catch (error) {
    console.error("Error liking blog page:", error);
    next(error);
  }
});

/* DELETE unlike a blog page by a user */
router.delete("/:blogPageId", async function (req, res, next) {
  const blogPageId = req.body.blogPageId;
  const userId = req.body.userId;
  try {
    const result = await unlikeBlogPageByUser(blogPageId, userId);
    res.send(result);
  } catch (error) {
    console.error("Error unliking blog page:", error);
    next(error);
  }
});

module.exports = router;
