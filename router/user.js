import  express  from "express";
import authenticationToken from "../Authentication/authentication";
import authenticationTokenId from "../Authentication/authentication";
import UserModel from "../DAL/models/userModel";

const UserRouter = express.Router();

const model = new UserModel();

UserRouter.get('/', authenticationToken, (req,res,next)=>{
    model.getAll().then(data=>{
        res.json({count:data.length,user:data})
    })
})
UserRouter.post("/findByUsername",authenticationToken, (req, res) => {
    const username = req.username  
    model.findByUsername(username)
    .then(data=>{
        res.json(data)
    })
}
)


UserRouter.post("/findById",authenticationTokenId, (req, res) => {
    const id = req.id || req.user.user.id
console.log(id)
    model.findById(id)
    .then(data=>{
        res.json(data)
    })
}
)
UserRouter.post("/login",(req,res)=>{
    const user = req.body
    const {username,password}=user
    model.findByUserNameandPassword(username,password).then(data=>{
        if(data.length>0){
            const token = model.generateAccessToken(username)
            res.json({exsted:true,token:token})
        }
        else{
            res.status(500).send({message: 'Login failed'})
        }
    })
})

UserRouter.post('/create',(req,res)=>{
    const user = req.body;
    model.createNewUser(user).then(data=>{
        res.json(data)
    })
})
UserRouter.put('/update',authenticationToken,(req,res)=>{
    const updateUser = req.body
    const username= req.username
    model.updateUser(updateUser,username).then(data=>{
        
         res.json(data)
     })
})
UserRouter.put('/updateId',authenticationToken,(req,res)=>{
    const updateUser = req.body
    const id= req.id
    model.updateUserId(updateUser,id).then(data=>{
        
         res.json(data)
     })
})
UserRouter.delete('/delete',authenticationToken,(req,res)=>{
    const username=req.username
    model.deleteUser(username).then(data=>{
        res.json(data)
    })
})
export default UserRouter

