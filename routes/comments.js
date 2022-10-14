var express= require('express');
const passport = require('passport');
var router = express.Router();
const {create,all,destroyComment,updateComment} = require('../controllers/commentController')

router.post('/', passport.authenticate('jwt', {session:false}), create)
router.get('/:id',all)
router.delete('/:id',destroyComment)
router.put('/:id',updateComment)
module.exports = router