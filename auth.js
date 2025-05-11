 //passport for authentication
 const Passport = require('passport')
 const localStrategy = require('passport-local').Strategy 
 const Person = require('./models/person')
 // local strategy for authentication
 Passport.use(new localStrategy(async(username,password,done)=>{
  try{

    const person = await Person.findOne({username:username});
   
    if(!person){
      return done(null,false,{message:'user not found'})
    }
    let isPasswordValid =  await person.comparePassword(password);
    if(isPasswordValid){
      return done(null,person)
    }else{
      return done(null,false,{message:'password is incorrect'})
    }
   
  }catch(err){
    console.log(err)
    return done(err)
  }
 }))

 module.exports = Passport

 