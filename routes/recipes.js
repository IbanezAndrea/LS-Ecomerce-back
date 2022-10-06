var express = require('express');
var router = express.Router();

const {addRecipe,getAllRecipes,getOneRecipe,deleteRecipe} = require('../controllers/recipeController');

router.post('/', addRecipe);
router.get('/:id', getAllRecipes);
router.get('/:id', getOneRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;