const express=require("express");
const res = require("express/lib/response");
const router=express.Router();
const mongoose=require("mongoose");
const requirelogin = require("../middlewares/requirelogin");
const Post = mongoose.model("Post")

router.get("/getallposts",requirelogin,(req,res)=>{
    Post.find()
    .populate("postedby","_id name")
    //  .populate("comments.postedby","_id name")
    .then(posts=>{
        res.json(posts)
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/getfollowingposts",requirelogin,(req,res)=>{
    Post.find({postedby:{$in:req.user.following}})
    .populate("postedby","_id name")
    // .populate("comments.postedby","_id name")
    .then(posts=>{
        res.json(posts)
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/mypost",requirelogin,(req,res)=>{
    Post.find({postedby:req.user._id})
    .populate("postedby","_id name")
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>{
        console.log(err);
    })
})

router.post("/createpost",requirelogin,(req,res)=>{
    const {title,body,pic}=req.body
    if(!title || !body || !pic)
    {
        res.status(401).json({error:"please add all the details"})
    }
    const post=new Post({
        title,
        body,
        photo:pic,// ye isliye kiya becoz post schema me photo namm se h
        postedby:req.user
    })
    req.user.password=undefined
    post.save()
    .then(result=>{
        res.json({post:result})
    }).catch(err=>{
        console.log(err);
    })
})

router.put("/like",requirelogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{      // postId = kya h
        $push:{likes:req.user._id}
    },{
        new:true // ye likhne se findnyidandupdate update ke bad wala data return karega
    }
    ).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({err:error})
        }
        else
        {
            res.json(result)
        }
    })
})

router.put("/unlike",requirelogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({err:error})
        }
        else
        {
            res.json(result)
        }
    })
})

router.put("/comment",requirelogin,(req,res)=>{
    const comment={
        text:req.body.text,
        name:req.body.name,
        postedby:req.user
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("postedby","_id name")
    //  .populate("comments.postedby","_id name")
    .exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({err:error})
        }
        else
        {
            res.json(result)
        }
    })
})

router.delete("/deletepost/:postId",requirelogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedby","_id")
    .exec((err,post)=>{
        if(err || !post)
        {
            return res.status(422).json({error:err})
        }
        if(post.postedby._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err);
            })
        }
        else{
            return res.status(422).json({error:"You can not delete this post"})
        }
    })
})

module.exports=router;