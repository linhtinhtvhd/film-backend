import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
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

UserSchema.pre('save',async function(next){
    try {
     
      const passwordHashed = await bcrypt.hash(this.password,10)
      this.password=passwordHashed
      next()
    } catch (error) {
        next(error)
    }
  })
export {UserSchema}