 const express = require('express');
 const app = express();
 const db = require('./db');
 const Person = require('./models/person')
 const bodyParser = require('body-parser')
app.use(bodyParser.json())
 app.get('/',(req,res)=>{
    res.send("hello")
 })
 app.post('/post',async (req,res)=>{
try{
const data = req.body
const newPerson =new Person(data);

const savedPerson=await newPerson.save()
console.log('data saved');
res.status(200).json(savedPerson)
}catch(err){
console.log(err);
res.status(500).json(savedPerson)
}

 })

 app.get("/getd",async(req,res)=>{
  try{
const data = await Person.find();
console.log('data fetch');
res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json(savedPerson)
    
  }
 })
 app.listen(3000,()=>{
   console.log('listening on p -3000')
 })