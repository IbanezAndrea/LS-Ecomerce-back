var express = require('express');
var router = express.Router();

const {addRecipe} = require('../controllers/recipeController');

router.post( '/', addRecipe);

module.exports = router;