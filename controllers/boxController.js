const Box = require('../models/Box');
const joi = require('joi');



const validator = joi.object({
    name:
    joi.string()
    .min(5)
    .max(100)
    .required(),
    price:
    joi.number()
    .required(),
    recipe:
    joi.string()
    .hex()
    .required(),
})


const boxController = {
    addBox: async (req, res) => {
        let {
            name,
            recipe,
            price
        } = req.body
        try {
            let result = await validator.validateAsync({
                name,
                image,
                recipe,
                price
            })
            let box= await new Box (result).save()
            res.status(201).json({
                message: 'Box added',
                success: true,
                response: box._id
            })
        } catch (error){
            res.status(400).json({
                message: error,
                success: false
            })
        }
    },
    getAllBoxes: async (req, res) => {
        let boxes
        let query = {}

        try {
            boxes = await Box.find(query)
            if (boxes){
                res.status(200).json({
                    message: 'Boxes found!',
                    response: boxes,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: 'Found nothing',
                    success: false
                })
            }
        }catch (error){
            res.status(400).json({
                message: error,
                success: false
            })
        }
    },
    getOneBox: async (req,res) =>{
        const {id} = req.params
        try{
            let box = await Box.findOne({_id:id})
            if(box){
                res.status(200).json({
                    message: "you get one box",
                    response: box,
                    succes: true
                })
            }else{
                res.status(404).json({
                    message: "couldn't find box",
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
    updateBox: async(req,res)=>{
        const {id} = req.params
        const updateBox = req.body
        try{
            let box = await Box.findOneAndUpdate({_id:id}, updateBox, {new:true})
            if(box){
                res.status(200).json({
                    message: "box updated successfully",
                    response: box,
                    succes: true
                })
            }else{
                res.status(404).json({
                    message: "couldn't find box",
                    succes: false
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false,
        })
        }
    },
    deleteBox: async(req,res) =>{
        const {id} = req.params
        try{
            let box = await Box.findOneAndDelete({_id:id})
            if(box){
                res.status(200).json({
                    message: "box deleted successfully",
                    success: true
                  }) 
            }else{
                res.status(404).json({
                    message: "couldn't find box",
                    success: false,
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false,
            })
        }
    }
}


module.exports = boxController