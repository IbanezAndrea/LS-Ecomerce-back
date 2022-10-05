
const Recipe = require('../models/Recipe');
const joi = require('joi');

// const validator = joi.object({

// })

const recipeController = {
    addRecipe : async (req, res) => {
        // let {
        //     user,
        //     description,
        //     calories,
        //     preptime,
        //     allergens
        // } = req.body
        try {
           // let result = validator.validateAsync(req.body)
            let recipe = await new Recipe(req.body).save()
            res.status(201).json({
                message: "New recipe added!",
                success: true,
                response: recipe._id
            })
        } catch (error){
            console.log(error)
        res.status(400).json({
            message: error,
            success: false,
    })
        }

    }
}

module.exports = recipeController;