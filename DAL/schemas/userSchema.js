import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    id:String,
    avatar:String,
    createdAt: Date,
    fullname:String,
    listfilm:Array
})
export {UserSchema}