 const express = require('express');
 const app = express();
 const personRoutes = require('./routes/personRoutes');
 const menuRoutes = require('./routes/menuRoutes')
 const db =require('./db')


 const bodyParser = require('body-parser')
app.use(bodyParser.json())
 app.get('/',(req,res)=>{
    res.send("hello")
 })

 


app.use('/persons',personRoutes);
app.use('/menu',menuRoutes);

 app.listen(3000,()=>{
   console.log('listening on p -3000')
 })