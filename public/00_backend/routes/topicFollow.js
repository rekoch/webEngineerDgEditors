const { createRouter, asyncHandler } = require("../utils/routerBase");
const {
  getFollowedAuthorsByUserId,
  getIsFollowingAuthor,
  followAuthorByUser,
  unfollowAuthorByUser,
} = require("../db/authorFollowRepo");

const router = createRouter();

/* GET followed authors for a user */
router.get("/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const followedAuthors = await getFollowedAuthorsByUserId(userId);
  res.send({ followedAuthors });
}));

/* GET is author followed by user */
router.get("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const isFollowedTopic = await getIsFollowingAuthor(topicName, userId);
  res.send({ isFollowedTopic });
}));

/* POST follow a topic */
router.post("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const result = await followAuthorByUser(topicName, userId);
  res.send(result);
}));

/* DELETE unfollow a topic */
router.delete("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const result = await unfollowAuthorByUser(topicName, userId);
  res.send(result);
}));

module.exports = router;
