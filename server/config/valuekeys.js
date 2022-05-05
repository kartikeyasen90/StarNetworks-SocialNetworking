// module.exports={
//     MONGOURI:"mongodb+srv://Kartik23:UxBYYEler1FvEVan@cluster0.y98ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET:"dsaknkladnklandkladn"
// }
if(process.env.NODE_ENV=="production"){
    module.exports=require("./prod")
}
else{
   module.exports=require("./dev")
}