const mongoose = require('mongoose')
const { Schema } = mongoose

const ProjectSchema = new Schema ({
    name : {
        type : String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    description : {
        type : String
    }
    , companyId : {
        type : Schema.Types.ObjectId,
        ref : 'Company'
    },
    projectStatus : {
        enum : ['Completed','Ongoing','Upcoming'],
        type : String,
        default : "UpComing"
    }
},{timestamps : true})
const Project = mongoose.model('project',ProjectSchema)
module.exports = Project