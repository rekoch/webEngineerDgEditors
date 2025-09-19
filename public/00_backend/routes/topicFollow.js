const { createRouter, asyncHandler } = require("../utils/routerBase");

const {
    getFollowedTopicsByUserId,
    getIsUserFollowingTopic,
    followTopicByUser,
    unfollowTopicByUser
} = require("../db/topicFollowRepo");

const router = createRouter();

/* GET followed topics for a user */
router.get("/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const followedTopics = await getFollowedTopicsByUserId(userId);
  res.send({ followedTopics });
}));

/* GET is topic followed by user */
router.get("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const isFollowedTopic = await getIsUserFollowingTopic(topicName, userId);
  res.send({ isFollowedTopic });
}));

/* POST follow a topic */
router.post("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const result = await followTopicByUser(topicName, userId);
  res.send(result);
}));

/* DELETE unfollow a topic */
router.delete("/:topicName/user/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const topicName = req.params.topicName;

  const result = await unfollowTopicByUser(topicName, userId);
  res.send(result);
}));

module.exports = router;
