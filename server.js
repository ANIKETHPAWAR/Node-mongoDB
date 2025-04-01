 const express = require('express');
 const app = express();
 const db = require('./db');
 const Person = require('./models/person')
 const bodyParser = require('body-parser')
app.use(bodyParser.json())
 app.get('/',(req,res)=>{
    res.send("hello")
 })
 app.post('/post',(req,res)=>{
const data= req.body
const newPerson = new Person(data);
newPerson.save((error,savedPerson)=>{
  if(error){
    console.log('Error saving person',error);
    res.status(500).json({error:'internal server error'})
  }else{
    console.log('data saved successfully');
    res.status(200).json(savedPerson);
  }
})

 })
 app.listen(3000,()=>{
   console.log('listening on p -3000')
 })