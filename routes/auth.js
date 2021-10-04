const router =require("express").Router();//import router
//which schema you use in this router
const User=require('../models/User')
const bcrypt=require('bcryptjs');

//REGISTER
router.post('/register', async(req,res)=>{
   const salt= await bcrypt.genSalt(10);
   const hashedPass= await bcrypt.hash(req.body.password,salt);

    try {
        const newUser= new User({
username:req.body.username,
email:req.body.email,
password:hashedPass,
        });

        const user=await newUser.save();
        res.status(200).json(user);

    }
     catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login',async(req,res)=>{
    try {
        //finding the user with entered username
        const user= await User.findOne({username:req.body.username})
//if username with entered credentials not found
!user && res.status(400).json("wrong credentials");

//matching the entered password
const validated= await bcrypt.compare(req.body.password,user.password);
//if password with entered credentials not found
!validated && res.status(400).json("wrong credentials");

//if we don't want to send password to user
//send everything except pwd from user._doc(inernal key)
const {password, ...others}=user._doc
//if both credentials is correct
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports=router; 
