const mongoose=require("mongoose");
const { required } = require("nodemon/lib/config");
const User=mongoose.model("User");
const {ObjectId}=mongoose.Schema.Types;

const postschema= new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true           
    },
    likes:[{
        type:ObjectId,    // ye ek array banaya h becz like ke waha kis ksine like kiya h unka id batayega
        ref:"User"
    }],
    
    postedby:{
        type:ObjectId,
        ref:"User"
    },
    comments:[{
        text:String,
        name:String,
        postedby:{type:ObjectId,ref:"User"}
    }]
})
mongoose.model("Post",postschema);