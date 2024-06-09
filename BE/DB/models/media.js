const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    cloudID:{
        required:true,
        type:String
    },
    type:{
        type:String,
        required:true
    },
    format:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required: true
    },
    filePath:{
        type:String,
        required:true
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
},{timestamps: true});

const mediaModel = mongoose.model('media', mediaSchema);

module.exports = mediaModel;