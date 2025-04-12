 const mongoose = require('mongoose');

 const mongoURL = 'mongodb://127.0.0.1:27017/myDatabase';
const mongoDb_URL = process.env.mongo_Url || mongoURL;

 mongoose.connect(mongoDb_URL,{
   useNewUrlParser: true,
   useUnifiedTopology:true
 })
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