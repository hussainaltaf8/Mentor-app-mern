const router =require("express").Router();//import router
//which schema you use in this router
const User=require('../models/User')
const bcrypt=require('bcryptjs');
const Post = require("../models/Post");

//UPDATE
router.put('/:id', async(req,res)=>{
    //check if userId(entered in body by user) is same as id passed in URL
   if(req.body.userId===req.params.id)
   {
       if(req.body.password)
       {
         const salt= await bcrypt.genSalt(10);
         req.body.password= await bcrypt.hash(req.body.password,salt);
       }
       try {
         const updatedUser= await User.findByIdAndUpdate(
             req.params.id,
             {
                 //set everything is in body(passed by user)
                 $set:req.body,
             },
             {
                 //it will send the updatedUser in postman
                 //if not then it will send the previous details in postman
                 //but sent the updated one in MongoDB
                 new:true,
             }
         )
     
 res.status(200).json(updatedUser);
 
       }
  catch (err) {
     res.status(500).json(err);
 }
   }
   
   else{
       res.status(401).json("You can only update your id")
   }
 
 });


//DELETE
router.delete('/:id', async(req,res)=>{
    //check if userId(entered in body by user) is same as id passed in URL
   if(req.body.userId===req.params.id)
   {
       try {
           //if finding the deleted user
           const user =await User.findById(req.params.id);
        try{
            //first deleting the post related to user
            await Post.deleteMany({ username: user.username });
            //deleting user
          await User.findByIdAndDelete(req.params.id);
         
     
          res.status(200).json("User has been deleted...");
           }   
      catch (err) {
         res.status(500).json(err);
     }
       } catch (err) {
           res.status(404).json("User not found!");
       }
      
   }
   
   else{
       res.status(401).json("You can only delete your id")
   }
 
 });

//GET
router.get('/:id',async (req,res)=>{
    try {
        const user=await User.findById(req.params.id);
const{password,...others}=user._doc;
res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
})




module.exports=router; 
