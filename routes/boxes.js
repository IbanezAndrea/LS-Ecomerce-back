var express = require('express')
var router = express.Router()
const {addBox} = require('../controllers/boxController')


router.post('/',addBox)

module.exports = router