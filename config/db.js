const mongoose = require('mongoose')

const DBconnect = async () => {
    await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true            
        }).catch(err => {
            console.error(`Database Connection Error! ${err}`)
        })    
}

module.exports = DBconnect