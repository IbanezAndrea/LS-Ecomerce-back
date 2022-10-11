var express = require('express');
var router = express.Router();
let passport = require('../config/passport');
let adminPassport = require('../config/adminPassport');
const {modifyUser,removeUser,updateAddresses,updateRole} = require('../controllers/userController');

router.patch('/address',passport.authenticate('jwt', { session: false }),updateAddresses);
router.delete('/remove/:id',passport.authenticate('jwt', { session: false }),removeUser);
router.put('/role/:id',adminPassport.authenticate('jwt', { session: false }),updateRole);
router.put('/:id',passport.authenticate('jwt', { session: false }),modifyUser);
module.exports = router;