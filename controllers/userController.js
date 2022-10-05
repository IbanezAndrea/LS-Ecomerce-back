const User = require('../models/User');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const sendMail = require('../controllers/sendMail');


const validator =joi.object({
    name: 
        joi.string()
        .pattern(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)
        .min(3)
        .max(15)
        .required(),
    lastname: 
        joi.string()
        .pattern(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)
        .min(3)
        .max(15)
        .required() ,
    photo: 
        joi.string()
        .uri()
        .required() ,
    email: 
        joi.alternatives()
        .try(
            joi.string()
                .lowercase()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                    allow: ["com", "ar", "net" ],
                    },
                }),
            )
        .required()
        .error(new Error("Invalid email")),
    password: 
        joi.string()
        .pattern(new
            RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: 
        joi.string()
        .min(3)
        .max(15)
        .required(),
    from: 
        joi.string()
        .min(3)
        .max(15)
        .required(),
    addresses:
        joi.string()
        .required()
})
const userController ={
    userSignUp: async (req, res) => {

        try{
            let result = await validator.validateAsync(req.body)
            let  {
                name,
                lastname,
                photo,
                email,
                password,
                from,
                addresses
            } = result
            let user = await User.findOne({email})
                if (!user){
                    let loggedIn = false;
                    let verified = false;
                    let code =  crypto
                        .randomBytes(15)
                        .toString('hex')
                    if(from === 'form'){ 
                        password = bcryptjs.hashSync(password,10);
                        user = await new User({ name, lastname, photo, email, password: [password], role:"user", from: [from], loggedIn, verified, code, addresses: [addresses]}).save()
                        sendMail(email,code)
                        res.status(201).json({
                            message: "User signed ✔",
                            success: true,
                            })
                    } else{ 
                        password = bcryptjs.hashSync(password,10);
                        verified = true,
                        user = await new User({ name, lastname, photo, email, password: [password], role:"user", from: [from], addresses: [addresses], loggedIn, verified, code }).save()
                        res.status(201).json({
                            message: "User signed from "+from,
                            success: true,
                        })
                    } 
                } else{
                    if(user.from.includes(from)){ 
                        res.status(200).json({
                            message: "User already exists...",
                            success: false 
                        })
                    } else{
                        user.from.push(from);
                        user.verified = true;
                        user.password.push(bcryptjs.hashSync(password,10))
                        await user.save()
                        res.status(201).json({
                            message: "User signed up from "+from,
                            success: true
                            })
                    }
                }
        }catch (error){
            console.log(error)  
            res.status(400).json({
                message: "could't signed up",
                success: false
                })
        }
    },
    verifyMail: async (req, res) => {
        const {code} = req.params
        try {
            let user = await User.findOne({ code })
            if (user) {
                user.verified = true
                await user.save()
                res.status("200").redirect(301, 'http://localhost:3000/signin')

            } else {
                res.status("404").json({
                    message: "This email does not belong to an account ",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    userSignIn: async (req,res) =>{
            const {email, password, from} = req.body
        try{
            const user= await User.findOne({email})
                if (!user){
                res.status(404).json({
                    success:false,
                    message: "User does not exist, please sign up!"
                })
            }else if (user.verified){
                    const checkPass= user.password.filter(passwordElement=> bcryptjs.compareSync(password, passwordElement))
                if(from === 'form'){ 
                        if(checkPass.length > 0){
                            const loginUser= {
                                id:user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                photo:user.photo
                            }

                            user.loggedIn = true
                            await user.save()
                            const token = jwt.sign({id: user._id}, process.env.KEY_JWT, {expiresIn: 60*60*24})
                            res.status(200).json({
                                success:true,
                                response: {
                                    user: loginUser,
                                    token:token},
                                message: `Welcome ${user.name}`
                            })
                        }else{
                            res.status(401).json({
                                success:false,
                                message: "Wrong username or password"
                            })
                        }
                }else{ 
                    if(checkPass.length > 0){
                        const loginUser= {
                            id:user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            from: user.from,
                            photo:user.photo
                        }
                        const token = jwt.sign({id: user._id}, process.env.KEY_JWT, {expiresIn: 60*60*24})
                        user.loggedIn = true
                        await user.save()
                        console.log (user)
                        res.status(200).json({
                            success:true,
                            response: {user: loginUser,
                                        token: token    
                            },
                            message: "Welcome " + user.name
                        })
                    }else{ 
                        res.status(400).json({
                            success:false,
                            message: "Invalid credentials"
                            })
                        }
                    }
            }else{ 
                res.status(401).json({
                    success:false,
                    message: "Please, verify your email account and try again..."
                })
            }
        }catch (error){
            console.log(error)
            res.status(400).json({
                success:false,
                message: "Error signing in"
            })
        }
    },
    userSignOut: async(req,res) => {
        const {email} = req.body
        try{
            let user = await User.findOne({email:email})
                    if (user){
                        user.loggedIn = false
                        await user.save()
                                res.status(200).json({
                                    message: 'You have successfully signed out!',
                                    success: true,
                                    response: user.loggedIn
                            })
                    } else {
                        res.status(404).json({
                            message: 'No user found...',
                            success: false
                        })
                    }
            } catch (error) {
                console.log(error);
                    res.status(400).json({
                        message: 'Failed to sign out...',
                        success:false
                    })
                }
        },
    getUser: async (req, res) => {
        const { id } = req.params
        try {
            let user = await User.findOne({ _id: id })  
            if (user) {
                res.status("200").json({
                    message: "Found ✔",
                    response: user,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "Coud not be found...",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    getUsers: async (req, res) => {
        let users
        let query = {}
        if(req.query.users){
            query.users= req.query.users
        }
        try {
            users = await User.find(query)
            if (users) {
                res.status("200").json({
                    message: "Users found!",
                    response: users,
                    success: true,
            })
            } else {
                res.status("404").json({
                    message: "No users could be found...",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error",
                success: false,
            })
        }
    },
    modifyUser: async (req, res)=>{
        const {email} = req.body
        const {email: uEmail, role:userRole} = req.user
        try {
            if (uEmail.toString() === email || userRole === "admin") {
                let putUser = await User.findOne({ email: email })
                if (putUser) {
                        let {
                            name,
                            lastname,
                            photo,
                            addresses,
                            role
                        } = req.body;
                    if (userRole !== "admin") {
                            putUser = await User.findOneAndUpdate(
                            { email:email }, {name,lastname,photo,addresses:[addresses]}, { new: true })
                                res.status("200").json({
                                    message: "User updated.",
                                    response: putUser,
                                    success: true,
                            })
                    } else if(userRole === "admin") {
                            putUser = await User.findOneAndUpdate(
                            { email:email }, {name,lastname,photo,addresses:[addresses],role}, { new: true })
                            res.status("200").json({
                                message: "User updated.",
                                response: putUser,
                                success: true,
                            })
                    } else{
                        res.status("404").json({
                            message: "This User does not exist.",
                            success: false,
                        })
                    }
            } else {
                res.status("401").json({
                    message: "Unahutorized",
                    success: false,
                })
            }
        }}catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    removeUser: async (req, res) => {
        const { id } = req.params
        if (req.user !== null) {
            try {
                await User.findOneAndDelete({ _id: id })
                res.status(200).json({
                    message: "You deleted an User.",
                    success: true,
                })
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    message: "Error",
                    success: false,
                })
            }
        } else {
            res.status(401).json({
                message: "Unahutorized",
                success: false,
            })
        }
    },
    verifyToken: (req, res) => {
        if (req.user !== null){
            res.status(200).json({
                success:true,
                response:{
                    user: {
                        id: req.user.userId,
                        name: req.user.name,
                        email: req.user.email,
                        role: req.user.role,
                        photo:req.user.photo
                    }
                },
                message: 'Welcome ' + req.user.name+'!'
            })
        }else {
            res.json({
                success:false,
                message: "Sign in please!"
            })
        }
        }
    }


module.exports =userController;