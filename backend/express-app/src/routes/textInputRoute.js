const express = require('express');
const TextInput = require('../models/TextInput');
const router = express.Router();
const multer=require('multer');
const  mongoose  = require('mongoose');


const upload = multer({ dest: 'uploads/' });
const uploadPhoto = upload.single('photo');


// Backend server functionalties mentioned in 3rd place implementation
// not checked yet 
router.post('/submit',uploadPhoto,async (req,res)=>{
    try {
        const newTextInput=new TextInput(req.body)
        const savedText=await newTextInput.save()
    
        res.status(201).json(savedText)
    } catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = router;