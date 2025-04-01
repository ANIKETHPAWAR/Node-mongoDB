const express = require('express');
const router = express.Router()
const menu = require('./../models/menu')
router.post('/menu',async(req,res)=>{
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
  router.get('/menu',async(req,res)=>{
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
  
  module.exports = router;