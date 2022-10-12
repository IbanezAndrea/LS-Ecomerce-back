
const Recipe = require('../models/Recipe');
const joi = require('joi');

const validator = joi.object({
    title:joi.string()
    .required(),
    image:
    joi.string()
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
    category:
    joi.string()
    .required(),
    allergens: 
        joi.array().items(joi.string())
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
    });

const recipeController = {
    addRecipe : async (req, res) => {
        let {
            title,
            image,
            description,
            calories,
            preptime,
            ingredients,
            allergens,
            category
        } = req.body
        let {userId} = req.user
        console.log(userId)
        console.log(typeof(userId))
        try {
            let result = await validator.validateAsync({
                title,
                image,
                description,
                calories,
                preptime,
                ingredients,
                allergens,
                category
            })
            let recipe = await new Recipe({...result, user: userId, approved:false}).save()
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
        let query = {approved: true}

        try{
            let recipes = await Recipe.find(query)
            
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
    },
    getRecipesByFilters: async (req, res) => {
        let query = {approved: true}

        if ((req.query.category).length > 0){
            query.category = req.query.category
        }
        if ((req.query.title).length > 0){
            query.title = { $regex: '^' + req.query.title, $options: 'i' };
        }
        
        try{
            let recipes = await Recipe.find(query)
            
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
    ,
    getOneRecipe: async (req,res) =>{
        const {id} = req.params
        try{
            let recipe = await Recipe.findOne({_id: id, approved: true})
            if(recipe){
                res.status(200).json({
                    message: "you get one recipe",
                    response: recipe,
                    succes: true
                })
            }else{
                res.status(404).json({
                    message: "couldn't find recipe",
                    succes: false
            })
        }
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "Error",
                succes: false
            })
        }
    },
    deleteRecipe: async(req, res) => {
        const {id} = req.params
        try{
            let recipe = await Recipe.findOneAndDelete({_id:id})
            if (recipe) {
                res.status(200).json({
                    message: "recipe deleted successfully",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "couldn't find recipe",
                    success: false,
                })
            }
        } catch(error) {
            console.log(error);
            res.status(400).json({
                message: "error",
                success: false,
        })
    }
    },
    approveRecipe: async (req, res) => {
        let {id} = req.params
        
        try {
            let recipe = await Recipe.findOneAndUpdate({ _id: id }, {
                approved: true
                })
                if (recipe) {
                res.status(200).json({
                    message: "Recipe approved",
                    response: recipe,
                    success: true
                })
            } else {
                    res.status(404).json({
                        message: "couldn't find recipe",
                        success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "error",
                succes: false
            })
        }
    },
    recipeFromUser: async(req,res) => {
        let query = {}

        if (req.user){
            query.user = req.user.userId

        }
        try{
           let recipe = await Recipe.find(query)
           if (recipe) {
            res.status(200).json({
                message: "you get recipes from user "+ query.user,
                response: recipe,
                success: true
              }) 
           } else {
            res.status(404).json({
                message: "couldn't find recipes",
                success: false,
                   })
                } 
            } catch(error) {
                console.log(error);
                res.status(400).json({
                    message: "error",
                    success: false,
            })
        }
    },
}

module.exports = recipeController;