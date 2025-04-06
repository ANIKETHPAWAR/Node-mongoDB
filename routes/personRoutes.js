const express = require('express');
const router = express.Router()
const Person = require('./../models/person')

router.post('/',async (req,res)=>{
    try{
    const data = req.body
    const newPerson =new Person(data);
    
    const savedPerson=await newPerson.save()
    console.log('data saved');
    res.status(200).json(savedPerson)
    }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'})
    }
    
     })

     router.get('/',async(req,res)=>{
        try{
      const data = await Person.find();
      console.log('data fetch');
      res.status(200).json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({error:'internal error'})
          
        }
       })

router.get('/:workType',async(req,res)=>{
  try{
const workType = req.params.workType;
if(workType == 'waiter'||'manager'){
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
});

router.put('/:id',async(req,res)=>{
  try{
const  newId = req.params.id;
const updateContent = req.body
const reponse = await Person.findByIdAndUpdate(newId,updateContent,{
  new:true,
  runValidators:true

 
})
res.status(200).json(reponse);
console.log('data updated')
if(!reponse){
  return res.status(404).json({error:'not found'})
}
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal error'})

  }
})

router.delete("/:id",async(req,res)=>{
  try{
const new1Id = req.params.id;
const deletedPerson = await Person.findByIdAndDelete(new1Id)
console.log('data deleted')
res.status(200).json(deletedPerson);
if(!deletedPerson){
  return res.status(404).json({error:'not found'})
}
  }
catch(err){
  console.log(err);
  res.status(500).json({error:'internal error'})
}})
module.exports = router;