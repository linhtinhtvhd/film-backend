import  express  from "express";
import CommentModel from "../DAL/models/commentModel";

const CommentRouter = express.Router()
const model = new CommentModel()

CommentRouter.post("/findById", (req, res) => {
    const {id} = req.body 
    model.findById(id)
    .then(data=>{
        res.json(data)
    })
}
)
CommentRouter.put("/update",(req,res)=>{
    const {updatecomment,id} = req.body

    
    model.updateComment(updatecomment,id).then(data=>{
        
        res.json(data)
    })
})
export default CommentRouter