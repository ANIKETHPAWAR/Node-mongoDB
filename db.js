 const mongoose = require('mongoose');

//  const mongoURL = 'mongodb://localhost:27017/myDatabase';
 require('dotenv').config()
const mongoDb_URL =  process.env.mongoDB_URL ;

mongoose.connect(mongoDb_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

//bridge connection b/w node.js & database server
 const db = mongoose.connection
                      
 //Event listeners
 db.on('connected',()=>{
    console.log('connected');  
 });
 db.on('disconnected',()=>{
    console.log('disconnected');

 });
 db.on('error',(err)=>{
    console.log('error:',err)
 });

 // export

 module.exports = db