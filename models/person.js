const mongoose = require('mongoose');
const brcypt = require('bcrypt');
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
});

personSchema.pre('save',async function(next ){
   const person = this; 
   if(!person.isModified('password')){
       return next();
   }
   //// if it returns false, it means password is not modified then it falls in try block
try{
const salt = await brcypt.genSalt(10);
const hash = await brcypt.hash(person.password,salt);
person.password = hash;
}catch(err){
    next(err);
}})

/// bcrypt to compare password provided by user with the hashed password stored in the database
personSchema.methods.comparePassword = async function(candidatePassword){
    
    try{
        const isMatch = await brcypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw new Error(err);
    }
}
let person = mongoose.model('person',personSchema);
module.exports = person;