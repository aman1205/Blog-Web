const express = require('express')
const router= require('express').Router()
const Post = require('../model/Post')


const app = express()
app.use(bodyParser.json());
//New Post 
router.post('/' ,async(req,res)=>{
    const newPost = new Post(req.body)
  try {
    const savepost = await newPost.save()
    req.status(200).json("Posted Succesfully")
  } catch (error) {
    res.status(500).json(error)
  }
})

//Update user info 
router.put('/:id' , async (req,res)=>{
    try {
        const post =await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true})
                res.status(401).json("Psot Update Successfully")
            } catch (error) {
                
            }
        }else{
            res.status(401).json("You can not update others post ")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//Delete 
router.delete('/:id' , async (req,res)=>{
    try {
        const post =await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
               await post.delete()
                res.status(401).json("Post Delete Successfully")
            } catch (error) {
                res.status(500).json(error)
            }
        }else{
            res.status(401).json("You can not delete others post ")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get User 
router.get('/:id' , async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports =router