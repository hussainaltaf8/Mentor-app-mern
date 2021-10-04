const router =require("express").Router();//import router
//which schema you use in this router
const User=require('../models/User')
const bcrypt=require('bcryptjs');
const Post = require("../models/Post");

//CREATE
router.post('/', async(req,res)=>{
    //new post creation will be outside try block
    
try {
    const newPost= await new Post(req.body);
//use await while saving post also
    const savedPost= await newPost.save();

    res.status(200).json(savedPost);
    
} catch (err) {
    res.status(500).json(err);
}
})


//UPDATE
router.put('/:id', async(req,res)=>{
    //find the requested post
   const post= await Post.findById(req.params.id);
 try {
     //compare with requested username with username
     //associated with that id in database
     if(post.username===req.body.username)
     {
       try {
           const updatedPost= await Post.findByIdAndUpdate(req.params.id,{
               $set:req.body,

           },{
               new:true
           })
           res.status(200).json(updatedPost);
       } catch (err) {
           res.status(500).json(err);
       }
     }
     else{
         res.status(401).json("you can update only your post")
     }
 } catch (err) {
     res.status(500).json(err);
 }
 });

//DELETE
router.delete('/:id', async(req,res)=>{
    //find the requested post
   const post= await Post.findById(req.params.id);
 try {
     //compare with requested username with username
     //associated with that id in database
     if(post.username===req.body.username)
     {
         //can delete by findbyidandDelete also
       await post.delete();

       res.status(200).json("post has been deleted")
     }
     else{
         res.status(401).json("you can delete only your own post")
     }
 } catch (err) {
     res.status(500).json(err);
 }
 });


//GET
router.get('/:id',async (req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL POSTS
// (/?user="john")
//http://localhost:5000/posts?user=altaf
router.get('/',async (req,res)=>{
    //Taking let bcz it is changeable.
    //everything inside that will be change
    //according to query
    let posts;

    //fetch all data on homepage
    //by username or category query
    const username= req.query.user;
    const catName=req.query.cat;
    try {
         if(username)
         {
             posts=await Post.find({username})
         }
         //if catName(requested by user) is
         //inside categories(Schema) array, then
         //find and assigned it to the let variable
         else if (catName){
            posts=await Post.find({
                categories:{
                    $in:[catName]
                },
             
            })
         }
         else{
            posts=await Post.find();
         }

res.status(200).json(posts);

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports=router; 
