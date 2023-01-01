var express= require('express');
const passport = require('passport');
let adminPassport = require('../config/adminPassport');
var router = express.Router();
const {create,all,destroyComment,updateComment} = require('../controllers/commentController')

router.post('/', passport.authenticate('jwt', {session:false}), create)
router.get('/:id',all)
router.delete('/:id', adminPassport.authenticate('jwt', { session: false }), destroyComment)
router.put('/:id', adminPassport.authenticate('jwt', { session: false }), updateComment)
module.exports = router