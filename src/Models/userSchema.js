const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type: String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    passwordHash : {
        type : String,
        required : true,
        minLength : [4,'password should not be less than 4 characters']
    },
    createdAt : {
        type : String,
        default : Date.now
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel