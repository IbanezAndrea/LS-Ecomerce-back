var express = require('express');
var router = express.Router();
const boxRouter = require('./boxes')
const userRouter = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ "title": "hello "})
});

router.use('/boxes',boxRouter)
router.use('/auth', userRouter)
module.exports = router;
