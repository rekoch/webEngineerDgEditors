const { createRouter, asyncHandler } = require("../utils/routerBase");
var router = createRouter();

var {
  getFollowedAuthorsByUserId,
  getIsFollowingAuthor,
  followAuthorByUser,
  unfollowAuthorByUser,
} = require("../db/authorFollowRepo");

/* GET followed authors for a user */
router.get("/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const followedAuthors = await getFollowedAuthorsByUserId(userId);
  res.send({ followedAuthors });
}));

/* GET is author followed by user */
router.get("/:authorEmail/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const authorEmail = req.params.authorEmail;
  
  const isFollowedAuthor = await getIsFollowingAuthor(authorEmail, userId);
  res.send({ isFollowedAuthor });
}));

/* POST follow an author */
router.post("/:authorEmail/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const authorEmail = req.params.authorEmail;
  
  const result = await followAuthorByUser(authorEmail, userId);
  res.send(result);
}));

/* DELETE unfollow an author */
router.delete("/:authorEmail/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const authorEmail = req.params.authorEmail;
  
  const result = await unfollowAuthorByUser(authorEmail, userId);
  res.send(result);
}));

module.exports = router;
