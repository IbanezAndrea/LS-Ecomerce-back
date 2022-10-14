var express = require('express');
var router = express.Router();
const boxRouter = require('./boxes');
const userRouter = require('./users');
const recipeRouter = require('./recipes');
const commentRouter = require('./comments')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ "title": "hello "})
});

router.use('/boxes',boxRouter);
router.use('/auth', userRouter);
router.use('/recipes', recipeRouter);
router.use('/comments', commentRouter);

module.exports = router;
