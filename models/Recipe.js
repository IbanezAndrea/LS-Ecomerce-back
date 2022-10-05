const { string } = require('joi');
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Types.ObjectId, ref: 'users', required: true},
        description: {type: string, required: true},
        calories: {type: Number, required:true},
        preptime:{type: Number, required: true },
        allergens: {type:String}
    }    
)

const Recipe = mongoose.model("recipes", recipeSchema);
module.exports = Recipe