const Comment = require('../models/Comment')

const commentController = {
    create: async(req,res)=>{
        const {message,recipe} = req.body
        let user = req.user.userId
        try{
            await new Comment({message,user,recipe}).save()
            res.status(201).json({
                message: "comment created",
                success: true
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    },
    all: async(req,res) =>{
        let comment
        let {id} = req.params
        console.log(id)
        try{
            comment = await Comment.find({recipe:id})
            .populate('user',{name:1,photo:1})
            .populate('recipe',{_id:1})
            res.status(200).json({
                message: "all comments found",
                response: comment,
                success: true
            })
        }catch(error){
            console.log(error)
            res.status(404).json({
                message: "error",
                success: false
            })
        }
    },
    destroyComment: async(req, res) => {
        const {id} = req.params
        try{
            let comment = await Comment.findOneAndDelete({_id:id})
           if (comment) {
            res.status(200).json({
                message: "comment deleted successfully",
                success: true
              }) 
           } else {
            res.status(404).json({
                message: "couldn't find comment",
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
    updateComment: async(req,res) =>{
        let {id} = req.params
        let modifyComment = req.body
        try{
            // let result = await validator.validateAsync(req.body)
            let comment = await Comment.findOneAndUpdate({_id:id},modifyComment)
            if(comment){
                res.status(200).json({
                    message: "comment update successfully ",
                    response: comment,
                    success: true
                })
            }else{
                res.status(404).json({
                    message: "comment not found ",
                    success: false
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    },
}
 module.exports = commentController