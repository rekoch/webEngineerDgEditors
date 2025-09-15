var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();
var {getCountOfLikesByBlogPageId, likeBlogPageByUser, unlikeBlogPageByUser } = require("../db/blogPageLikesRepo");

/* GET likes count for a blog page */
router.get("/:blogPageId", async function (req, res, next) {
  const blogPageId = req.params.blogPageId;
  try {
    const likeCount = await getCountOfLikesByBlogPageId(blogPageId);
    res.send({ likeCount });
  } catch (error) {
    console.error("Error fetching likes:", error);
    // Fehler an Express Error Handler weiterleiten
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
