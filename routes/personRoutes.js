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

module.exports = router;