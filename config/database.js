const mongoose= require ('mongoose')

mongoose.connect(
    process.env.DB_LINK,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then(()=>console.log('Successfully connected to the database! 🐙'))
    .catch(error=>console.log(error))
    