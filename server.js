 const express = require('express');
 const app = express();
 const db = require('./db');
 const Person = require('./models/person')
 const menu = require('./menu')
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
app.post('/menu',async(req,res)=>{
  try{
const menuData = req.body;
const newMenu = menu(menuData);
const saveMenu = await newMenu.save()
console.log('done')
res.status(200).json(saveMenu)
  }
  catch(err){
    console.log(err);
    res.status(500).json(saveMenu)
    
  }
})
app.get('/getd/:workType',async(req,res)=>{
  try{
const workType = req.params.workType;
if(workType == 'waiter'){
const sendRes =await Person.find({designation:workType});
console.log('response fetched')
res.status(200).json(sendRes);
}
else{
  res.status(404).json({
    error:'input error'
  })
}
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"internal error"})
    
  }
})




 app.listen(3000,()=>{
   console.log('listening on p -3000')
 })