const { createRouter } = require("../utils/routerBase");

const router = createRouter();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
