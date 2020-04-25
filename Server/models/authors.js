const mongoose=require("mongoose")
const Schema=mongoose.Schema;


const AuthorType=new Schema({
    name:String,
    age:Number
})

module.exports=mongoose.model('Author' , AuthorType)