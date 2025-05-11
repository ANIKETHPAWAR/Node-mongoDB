const express = require('express');
const router = express.Router()
const Person = require('./../models/person')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')

/// signup token
router.post('/signup',async (req,res)=>{
    try{
    const data = req.body
    const newPerson =new Person(data);
    
    const savedPerson=await newPerson.save()
    console.log('data saved');

    // generating new token
const payLoad ={
  id: savedPerson.id,
  username: savedPerson.username
}
const token = generateToken(payLoad);
console.log('your token is :' ,token);






    res.status(200).json({savedPerson,token : token})
    }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'})
    }
    
     })
/// login routes token 

router.post('/login',async (req,res)=>{


try{
const {username,password} = req.body;

const user = await Person.findOne({username:username});

if(!user || !(await user.comparePassword(password))){
return response.status(401).json({error: 'user didnt match'})
}

const payLoad = {
  id :user.id,
  username : user.username

}

const token = generateToken(payLoad);
res.json({token})


}
catch(err){
console.error(err);
res.status(500).json({error: 'interal server error'})
}

})
//// protected routes 

     router.get('/',jwtAuthMiddleware,async(req,res)=>{
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

    router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
      try{
const userData = req.user;
      console.log('user Data ', userData);

      const userId = userData.id
const user = await Person.findById(userId)
console.log('user found')
res.status(500).json(user )
      }
      catch(err){
console.error(err);
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