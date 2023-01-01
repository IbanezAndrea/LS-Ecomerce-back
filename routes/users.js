var express = require('express');
var router = express.Router();
let passport = require('../config/passport');
let adminPassport = require('../config/adminPassport');
const updateUserRouter = require('./updateUser');
const {userSignUp, verifyMail, userSignIn,userSignOut,getUser,getUsers,verifyToken} = require('../controllers/userController');


router.get('/',adminPassport.authenticate('jwt', { session: false }), getUsers);
router.post('/signup',userSignUp);
router.post('/signin',userSignIn);
router.post('/signout',passport.authenticate('jwt', { session: false }),userSignOut);
router.get('/verify/:code',verifyMail);
router.post('/verify-token',passport.authenticate('jwt', { session: false }),verifyToken);
router.use('/update',updateUserRouter)
router.get('/:id', getUser);
module.exports = router;