const mongoose = require('mongoose')
const { Schema } = mongoose

const companySchema = new Schema ({
    companyName : {
        type : String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    phoneNumber : {
        type : String,
        minlength : 10,
        maxlength : 10
    },
    description : {
        type : String
    }
},{timestamps : true})
const Company = mongoose.model('Company',companySchema)
module.exports = Company