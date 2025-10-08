const express = require("express");
const { enableLogging } = require("../utils/routerBase");
const router = express.Router();

enableLogging(router);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
