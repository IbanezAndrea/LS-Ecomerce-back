var express = require('express');
var router = express.Router();

const userRouter = require('./auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.use('/auth',userRouter)
module.exports = router;