import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    username:String,
    id:String,
    avartar:String,
    createdAt: Date,
    fullname:String,
    body:Array
})
export {CommentSchema}