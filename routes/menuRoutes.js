const express = require('express');
const router = express.Router()
const menu = require('./../models/menu')
router.post('/',async(req,res)=>{
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
  router.get('/',async(req,res)=>{
    try{
        const menuItems =await menu.find();
        console.log('data found')
        res.status(200).json(menuItems)
    }
    catch(err){
        console.log(err);
        res.status(500).json(menuItems)
    }
  })
  
  router.get('/:spicy',async(req,res)=>{
    try{
        const reqType = req.params.spicy
    
        if(reqType == 'hot'||'heavy'){
          let resData = await menu.find({spicy:reqType})
          console.log('found healthy food!!')
          res.status(200).json(resData)
        }
        else{
          console.log("invalid input 404")
          res.status(400).json(resData)
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(resData)
    }
  })
  
  module.exports = router;