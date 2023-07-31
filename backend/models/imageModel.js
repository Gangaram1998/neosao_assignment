const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image:{
        required:true,
        type:String
    },
    tag:{
        required:true,
        type:String
    }
},{
    versionKey:false,
    timestamps:true
})

const ImageModel = mongoose.model('upload',imageSchema)

module.exports ={
    ImageModel
}