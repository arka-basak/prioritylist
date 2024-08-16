const mongoose = require('mongoose')
const env = require('dotenv').config()


//MONGO SETUP 
const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then(result =>{
        console.log('Connected to MongoDB')
    })
    .catch(error =>{
        console.log('error connecting to Mongo.DB', error.message)
    })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
    transform: function (doc,ret, options){
        ret.id = String(ret._id)
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)

