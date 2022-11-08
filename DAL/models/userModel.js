import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import { UserSchema } from "../schemas/userSchema";


// UserSchema.methods.isValidPassword = async function(newPassword){
//  try {
//   return await bcrypt.compare(newPassword,this.password)
//  } catch (error) {

//  }
// }
class UserModel{
    constructor(){
        this.model = mongoose.model("user",UserSchema)

    }
    getAll(){
        const query = this.model.find();
        return query.exec();
    }
    findByUserNameandPassword(username,password){
        const query = this.model.find({username:username}).limit(1)
    
        return query.exec()
    }
    findByUsername(username) {
      const query = this.model.find({username:username}).limit(1)
      return query.exec();
    }
    findById(id) {
      const query = this.model.find({id:id})
      return query.exec();
    }
    generateAccessToken (username) {
        return jwt.sign({ username: username }, "bWluZHgud2ViNjE=", {
          expiresIn: "7d",
        });
      };
    generateAccessTokenId (id) {
        return jwt.sign({ id: id }, "bWluZHgud2ViNjE=", {
          expiresIn: "7d",
        });
      };
      
}
UserModel.prototype.createNewUser = async function (user) {
    var newUser = {
      id:user.id,
      username: user.username,
      password: user.password,
      fullname:user.fullname,
      createdAt: new Date(),
    };
    return this.model.create(newUser);
  };
  UserModel.prototype.updateUser = async function(update,username){
    const password=update.password
    const fullname=update.fullname
    const listfilm=update.listfilm
    const avatar=update.avatar
    // const salt = await bcrypt.genSalt(10)
    // const passwordHashed = await (await bcrypt.hash(password,salt)).toString()
    
    const query = {username:username}
    var updateUser = {
      password:password,
      fullname:fullname,
      avatar:avatar,
      listfilm:listfilm

    }
    return this.model.findOneAndUpdate(query,updateUser,{ upsert: true })
  }
  UserModel.prototype.updateUserId = async function(update,id){
    const password=update.password
    const fullname=update.fullname
    const listfilm=update.listfilm
    const avatar=update.avatar
  
    const query = {id:id}
    var updateUser = {
      password:password,
      fullname:fullname,
      avatar:avatar,
      listfilm:listfilm

    }
    return this.model.findOneAndUpdate(query,updateUser,{ upsert: true })
  }
  UserModel.prototype.FindAndUpdate = async function(user){
    const fullname=user.displayName
    const listfilm=user.listfilm
    const avatar=user.picture
    const id=user.id
  
    const query = {id:user.id}
    var updateUser = {
      id:id,
      fullname:fullname,
      avatar:avatar,
      listfilm:listfilm,
      createdAt: new Date(),
    }
    return this.model.findOneAndUpdate(query,updateUser,{ upsert: true })
  }
  UserModel.prototype.FindAndUpdateFb = async function(user){
    const fullname=user.displayName
    const listfilm=user.listfilm
    const avatar=user.photos[0].value
    const id=user.id
  
    const query = {id:user.id}
    var updateUser = {
      id:id,
      fullname:fullname,
      avatar:avatar,
      listfilm:listfilm,
      createdAt: new Date(),
    }
    return this.model.findOneAndUpdate(query,updateUser,{ upsert: true })
  }
  UserModel.prototype.deleteUser = async function(username){
    const query = {username:username}
     return this.model.findOneAndDelete(query)
  }
export default UserModel