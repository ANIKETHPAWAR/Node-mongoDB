 const mongoose = require('mongoose');

//  const mongoURL = 'mongodb://localhost:27017/myDatabase';
 require('dotenv').config()
const mongoDb_URL =  process.env.MONGODB_URI ;

mongoose.connect(mongoDb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => {
    console.log('MongoDB connected');
})
if (!mongoDb_URL) {
   console.error("❌ MONGODB_URI is undefined. Check your .env or Render environment variables.");
   process.exit(1);
 }
 

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