const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
        message: { type: String, required: true },
        recipe: { type: mongoose.Types.ObjectId, ref: 'recipes', required: true }
    }
)

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment