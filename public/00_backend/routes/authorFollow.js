const { createRouter } = require("../utils/routerBase");
var router = createRouter();

var {
  getFollowedAuthorsByUserId,
  getIsFollowingAuthor,
  followAuthorByUser,
  unfollowAuthorByUser,
} = require("../db/authorFollowRepo");

/* GET followed authors for a user */
router.get("/user/:userId", async function (req, res, next) {
  const userId = req.params.userId;

  try {
    const followedAuthors = await getFollowedAuthorsByUserId(userId);
    res.send({ followedAuthors });
  } catch (error) {
    console.error("Error fetching followed authors:", error);
    // Fehler an Express Error Handler weiterleiten
    next(error);
  }
});

/* GET is author followed by user */
router.get(":authorEmail/user/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  const authorEmail = req.params.authorEmail;

  try {
    const isFollowedAuthor = await getIsFollowingAuthor(authorEmail, userId);
    res.send({ isFollowedAuthor });
  } catch (error) {
    console.error("Error fetching followed authors:", error);
    // Fehler an Express Error Handler weiterleiten
    next(error);
  }
});

/* POST follow an author */
router.post("/:authorEmail/user/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  const authorEmail = req.params.authorEmail;
  try {
    const result = await followAuthorByUser(authorEmail, userId);
    res.send(result);
  } catch (error) {
    console.error("Error following author:", error);
    next(error);
  }
});

/* DELETE unfollow an author */
router.delete("/:authorEmail/user/:userId", async function (req, res, next) {
  const userId = req.params.userId;
  const authorEmail = req.params.authorEmail;
  try {
    const result = await unfollowAuthorByUser(authorEmail, userId);
    res.send(result);
  } catch (error) {
    console.error("Error unfollowing author:", error);
    next(error);
  }
});

module.exports = router;
