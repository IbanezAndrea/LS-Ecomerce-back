var express = require('express');
var router = express.Router();
const boxRouter = require('./boxes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ "title": "hello "})
});

router.use('/boxes',boxRouter)
module.exports = router;
