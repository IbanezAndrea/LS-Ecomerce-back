var express = require('express');
var router = express.Router();
let passport = require('../config/passport');
let adminPassport = require('../config/adminPassport');
const {userSignUp, verifyMail, userSignIn,userSignOut,getUser,getUsers,modifyUser,removeUser,verifyToken,updateAddresses} = require('../controllers/userController');


router.get('/',adminPassport.authenticate('jwt', { session: false }), getUsers);
router.get('/:id', adminPassport.authenticate('jwt', { session: false }), getUser);
router.post('/signup',userSignUp);
router.post('/signin',userSignIn);
router.post('/signout',passport.authenticate('jwt', { session: false }),userSignOut);
router.get('/verify/:code',verifyMail);
router.post('/verify-token',passport.authenticate('jwt', { session: false }),verifyToken);
router.put('/update',passport.authenticate('jwt', { session: false }),modifyUser);
router.patch('/update-address',passport.authenticate('jwt', { session: false }),modifyUser);
router.delete('/remove',passport.authenticate('jwt', { session: false }),removeUser);
module.exports = router;