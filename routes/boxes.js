var express = require('express');
var router = express.Router();
// let passport = require('../config/passport');
let adminPassport = require('../config/adminPassport');
const {addBox, getAllBoxes,getOneBox,updateBox,deleteBox} = require('../controllers/boxController');


router.post('/',/*adminPassport.authenticate('jwt', { session: false }),*/addBox);
router.get('/',getAllBoxes);
router.get('/:id',getOneBox);
router.put('/:id',adminPassport.authenticate('jwt', { session: false }),updateBox);
router.delete('/:id',adminPassport.authenticate('jwt', { session: false }),deleteBox);

module.exports = router