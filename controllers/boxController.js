const Box = require('../models/Box');
const joi = require('joi');



const validator = joi.object({
    name:
    joi.string()
    .min(5)
    .max(100)
    .required(),
    image:
    joi.string()
    .required(),
    price:
    joi.number()
    .required(),
    category:
    joi.string()
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
            image,
            recipe,
            price,
            category
        } = req.body
        try {
            let result = await validator.validateAsync(req.body)
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
                    succes: true
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
    }

}


module.exports = boxController