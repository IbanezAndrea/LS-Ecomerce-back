var express = require('express');
var router = express.Router();
let passport = require('../config/passport');
let adminPassport = require('../config/adminPassport');
const {addRecipe,getAllRecipes,getOneRecipe,deleteRecipe,approveRecipe} = require('../controllers/recipeController');

router.post('/', addRecipe);
router.patch('/approve/:id',adminPassport.authenticate('jwt', { session: false }), approveRecipe);
router.get('/', getAllRecipes);
router.get('/:id', getOneRecipe);
router.delete('/:id',adminPassport.authenticate('jwt', { session: false }), deleteRecipe);

module.exports = router;