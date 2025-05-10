 const express = require('express');
 const app = express();
 const personRoutes = require('./routes/personRoutes');
 const menuRoutes = require('./routes/menuRoutes')
 const db =require('./db')
require('dotenv').config()
const PORT = process.env.PORT || 3000
 const bodyParser = require('body-parser')
app.use(bodyParser.json())

//middleware func
const logger = (req,res,next)=>{
  console.log(`logger: ${req.method} request made to : ${req.url} on ${new Date()}`);
  next();
}
app.use(logger);



 app.get('/',logger,(req,res)=>{
    res.send("hello")
 })

 


app.use('/persons',personRoutes);
app.use('/menu',menuRoutes);

 app.listen(PORT,()=>{
   console.log('listening on p -3000')
 })