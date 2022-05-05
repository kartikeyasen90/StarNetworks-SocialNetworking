const express= require("express");
const app=express();

const mongoose =require("mongoose");
const {MONGOURI}=require("./config/valuekeys.js")
const PORT= process.env.PORT||5000;
require("./models/user.js")
require("./models/posts.js")


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log("we are connected to the server ");
})

//password UxBYYEler1FvEVan
app.use(express.json());
app.use(require("./routes/authentication.js"))
app.use(require("./routes/posts.js"))
app.use(require("./routes/user.js"))


mongoose.connection.on('error',()=>{
    console.log("we are not connected to the server ");
})
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("the server started at",PORT);
})