
const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const userSchema=new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true
     },
     password:{
         type:String,
         required:true
     },
     followers:[
         {
             type:ObjectId,
             ref:"User"
         }
     ],
     following:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    pic:{
        type:String,
        default:"https://res.cloudinary.com/kartik23cloud/image/upload/v1647319107/defaultphoto_ewj89v.jpg"
    }
 })

 module.exports=mongoose.model('User',userSchema);