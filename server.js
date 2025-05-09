 const express = require('express');
 const app = express();
 const personRoutes = require('./routes/personRoutes');
 const menuRoutes = require('./routes/menuRoutes')
 const db =require('./db')
require('dotenv').config()
const PORT = process.env.PORT || 3000
 const bodyParser = require('body-parser')
app.use(bodyParser.json())
 app.get('/',(req,res)=>{
    res.send("hello")
 })

 


app.use('/persons',personRoutes);
app.use('/menu',menuRoutes);

 app.listen(PORT,()=>{
   console.log('listening on p -3000')
 })