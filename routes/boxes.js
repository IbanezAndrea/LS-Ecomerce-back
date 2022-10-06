var express = require('express');
var router = express.Router();
const {addBox, getAllBoxes,getOneBox,updateBox,deleteBox} = require('../controllers/boxController');


router.post('/',addBox);
router.get('/',getAllBoxes);
router.get('/:id',getOneBox);
router.put('/:id',updateBox); // no sabia si put o patch
router.delete('/:id',deleteBox);

module.exports = router