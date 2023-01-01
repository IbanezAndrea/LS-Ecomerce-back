var express = require('express');
var router = express.Router();
let passport = require('../config/passport');
let adminPassport = require('../config/adminPassport');
const {addRecipe,getAllRecipes,getOneRecipe,deleteRecipe,approveRecipe, getRecipesByFilters, recipeFromUser, getNotApprovedRecipes,getNotApprovedRecipe} = require('../controllers/recipeController');

router.post('/', passport.authenticate('jwt', { session: false }), addRecipe);
router.get('/', getAllRecipes);
router.get('/queryuser',passport.authenticate('jwt', { session: false }), recipeFromUser)
router.get('/query/', getRecipesByFilters);
router.get('/approve',adminPassport.authenticate('jwt', { session: false }), getNotApprovedRecipes);
router.patch('/approve/:id',adminPassport.authenticate('jwt', { session: false }), approveRecipe);
router.get('/approve/:id',adminPassport.authenticate('jwt', { session: false }), getNotApprovedRecipe);
router.get('/:id', getOneRecipe);
router.delete('/:id',adminPassport.authenticate('jwt', { session: false }), deleteRecipe);
module.exports = router;