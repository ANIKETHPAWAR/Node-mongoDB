const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    Name:{
        type:String,
        required : true,
    },
    age:{
        type: Number,

    },
    designation:{
        type:String,
        enum:['chef','customer','waiter','manager']
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:Number,
        
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
})

let person = mongoose.model('person',personSchema);
module.exports = person;