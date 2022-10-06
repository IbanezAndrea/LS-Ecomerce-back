const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Types.ObjectId, ref: 'users', required: true},
        title: {type: String, required: true},
        description: {type: String, required: true},
        calories: {type: Number, required:true},
        ingredients: {type: Array, required:true},
        preptime:{type: Number, required: true },
        allergens: {type: Array},
        approved: { type: Boolean, required: true },
        category: {type: String, required:true}
    }
)

const Recipe = mongoose.model("recipes", recipeSchema);
module.exports = Recipe