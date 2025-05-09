 const mongoose = require('mongoose');

 const mongoURL = 'mongodb://localhost:27017/myDatabase';
 require('dotenv').config()
const mongoDb_URL =  process.env.mongoDB_URL ||   mongoURL;

 mongoose.connect(process.env.mongoDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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