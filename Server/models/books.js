const mongoose=require("mongoose")
const Schema=mongoose.Schema;


const BookType = new Schema({
    name:String,
    genre:String,
    authorId:String
})

module.exports=mongoose.model('Book' , BookType)

