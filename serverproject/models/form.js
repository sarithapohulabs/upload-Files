const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema= new Schema({
    "title":{
        type:String,
        required: true
    },
    "description":{
        "type":String,
        required: true
    },
    "school":{
        type:String,
        required:true
    },
    "department":{
        type:String,
        required:true
    },
    "AssignedTo":{
        type:String,
        required:true
    }

})

module.exports= mongoose.model("Form",formSchema);
