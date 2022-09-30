const mongoose= require ('mongoose')

    const userSchema = new mongoose.Schema(
        {
        name:{type: String, required:true},
        lastname:{type: String},
        email:{ 
                type : String,
                min: [4, 'Too short, min is 4 characters'], 
                max: [32, 'Too long, max is 32 characters'],
                unique : true, 
                lowercase : true, 
                required :true, 
                match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
            },
        password:[{
            type: String, min: [4, 'Too short, min is 4 characters'], 
            max: [32, 'Too long, max is 32 characters'],  
            required:true
            }],
        photo:{type: String},
        role:{type: String, required:true},
        from:[{type: String, required:true}],
        verified:{type: Boolean, required:true},
        loggedIn:{type: Boolean, required:true},
        code: {type: String, required:true}
        }
    );

    const User= mongoose.model("users", userSchema);
module.exports = User
