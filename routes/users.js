var express = require('express');
var router = express.Router();
let passport = require('../config/passport');
const {userSignUp} = require('../controllers/userController');


router.post('/signup',userSignUp);

module.exports = router;