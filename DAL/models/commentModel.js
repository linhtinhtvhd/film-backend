import mongoose from "mongoose";
import { CommentSchema } from "../schemas/commentSchema";


class CommentModel{
    constructor(){
        this.model = mongoose.model("comment",CommentSchema)
    }
    findById(id) {
      const query = this.model.find({id:id})
      console.log(id)
      return query.exec();
    }
 
      
}

  CommentModel.prototype.updateComment = async function(update,id){
    const body = update
   
    const query = {id:id}
    var updateComment = {
      body:body,
      id:id
    }
    return this.model.findOneAndUpdate(query,updateComment,{ upsert: true })
  }
export default CommentModel