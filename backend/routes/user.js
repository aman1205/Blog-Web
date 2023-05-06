const express = require('express')
const router= require('express').Router()
const User = require('../model/user')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

const app = express()
app.use(bodyParser.json());
//Update user info 
router.put('/:id' ,async(req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            req.body.password= await bcrypt.hash(req.body.password,10)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true})
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("Wrong Credentails")
    }
})
//Delete 

//Get User 
router.get('/:id' , async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password , ...others}= user._doc;
        res.status(200).json(others)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports =router