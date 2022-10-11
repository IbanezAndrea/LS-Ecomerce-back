const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        recipe: {type: mongoose.Types.ObjectId, ref: 'recipes', required:true},
        price: {type: Number, required:true},
        calification: {type: Number, required:true},
        serves: {type: Number, required:true},
         
    }
)

const Box = mongoose.model("boxes", boxSchema);
module.exports = Box