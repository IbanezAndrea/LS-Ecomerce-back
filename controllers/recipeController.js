
const Recipe = require('../models/Recipe');
const joi = require('joi');


// let ingredient = joi.object().keys({
//     name:
//     joi.string()
//     .required(),
//     category:
//     joi.string()
//     .required(),
//     quantity:
//     joi.string()
//     .required()
// })


const validator = joi.object({
    user: joi.string()
        .hex()
        .required(),
    description: 
        joi.string()
        .required(),
    calories:
        joi.number()
        .required(),
    preptime:
        joi.number()
        .required(),
    allergens: 
        joi.string()
        .required(),
    ingredients: 
    joi.array()
    .items(
        joi.object().keys({
            name:
            joi.string()
            .required(),
            category:
            joi.string()
            .required(),
            quantity:
            joi.string()
            .required()
        })
    )
    .required()
    })

const recipeController = {
    addRecipe : async (req, res) => {
        let {
            user,
            description,
            calories,
            preptime,
            ingredients,
            allergens
        } = req.body
        try {
            let result = await validator.validateAsync(req.body)
            let recipe = await new Recipe(result).save()
            res.status(201).json({
                message: "New recipe added!",
                success: true,
                response: recipe._id
            })
        } catch (error){
        res.status(400).json({
            message: error,
            success: false,
            })
        }
    },
    getAllRecipes: async (req, res) => {
        let recipes
        let query = {}
        try{
            recipes = await Recipe.find(query)
            if (recipes){
                res.status(200).json({
                    message: "Recipes found!",
                    response: recipes,
                    success: true,
                    })
                } else {
                    res.status(404).json({
                        message: "Found nothing",
                        success: false
                    })
                }
        } catch (error){
            res.status(400).json({
                message: error,
                success: false
            })
        }
    }
}

module.exports = recipeController;