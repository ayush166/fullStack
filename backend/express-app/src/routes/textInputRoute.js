const express = require('express');
const TextInput = require('../models/TextInput');
const router = express.Router();
const multer=require('multer');
const  mongoose  = require('mongoose');
const Connection = require('../models/Connection');
const { callDjangoNgramsApi } = require('../services/djangoApiService.js');
const { storeRecentString } = require('../utils/recentStringStore.js');
const PersonID = require('../models/PersonID.js');
const Friend = require('../models/Friend.js');


const upload = multer({ dest: 'uploads/' });
const uploadPhoto = upload.single('photo');


// Backend server functionalties mentioned in 3rd place implementation
// not checked yet 
router.post('/submit',uploadPhoto,async (req,res)=>{
    try {
        //3.b receive the text that was inserted from the frontend and insert it in another Model and Table
        const newTextInput=new TextInput(req.body)
        const savedText=await newTextInput.save()
        const { id:string1, friendId:string2 } = req.body;
        
        storeRecentString(string1);
        storeRecentString(string2);
        
       // d. Add the persons ID (A) to mongodb
        const personID = new PersonID({ personID: req.body.id });
        await personID.save();
       
        //3 f. update friend's (B) friendList to include person (A)
        await Friend.findOneAndUpdate(
            { friendId: string2 },
            { $addToSet: { friendsList: personID._id } }, //$addToSet to avoid duplicates
            { upsert: true, new: true }
          );


          //3 a. log the number of times a connection is made by the frontend and insert it into a Mongoose Model
          const connection = await Connection.findOneAndUpdate({}, { $inc: { count: 1 }, lastConnected: new Date() }, { upsert: true, new: true });
          console.log(`Connection count is now: ${connection.count}`);
         
        //  4. Create a Django server that has an API that returns the ngrams comparison using NLTK.
        const ngramsData = await callDjangoNgramsApi();
        res.status(201).json({
            user: savedText,
            ngrams: ngramsData,
            connectionCount:connection.count
          });
    } catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = router;