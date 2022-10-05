var express = require('express');
var router = express.Router();
const {addBox, getAllBoxes} = require('../controllers/boxController');


router.post('/',addBox);
router.get('/',getAllBoxes);

module.exports = router