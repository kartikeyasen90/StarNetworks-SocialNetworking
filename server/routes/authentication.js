const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const {JWT_SECRET}=require("../config/valuekeys")
const requirelogin=require("../middlewares/requirelogin")

router.get("/",(req,res)=>{
    res.redirect("/home");
})

router.post("/signup",(req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!name || !email || !password)
    {
       return res.status(422).json({error:"You need to give all the information"});
    }
    // res.json({message:"your info send succesfully"});
    //console.log(req.body.name);
    User.findOne({email:email}).then((savedUser=>{
        if(savedUser)
        {
            return res.status(422).json({error:"user already exist with this email"});
        }
     bcrypt.hash(password,12).then(hashedpassword=>{    //hasing the password using bcrypt
            
        const user= new User({
            name:name,
            email:email,
            password:hashedpassword,
            pic:pic
        })

        user.save()
        .then(user=>{
           return res.json({message:"saved successfully"})
        }).catch(err=>{
            console.log(err);
          })
     })
        
    })).catch(err=>{
        console.log(err);
    })
})

router.get("/protected",requirelogin,(req,res)=>{
    res.send("hello user");
})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
      return  res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"invalid email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(domatch=>{
            if(domatch)
            {
                //  res.json({message:"successfully logged in"});
                const token= jwt.sign({_id:savedUser._id},JWT_SECRET); //jwt token assign kar rahe h
                const {_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else
            {
                 return res.status(422).json({error:"invalid email or password"})
            }
        }).catch(err=>{
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
    })

})

module.exports=router;