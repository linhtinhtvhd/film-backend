import jwt from 'jsonwebtoken'
 function authenticationTokenId(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token===null) return res.sendStatus(401)
    jwt.verify(token,'bWluZHgud2ViNjE=',(err,user) =>{
        if(err){   
            return res.sendStatus(403)
        }
        console.log(user.id)
        req.id = user.id
       
        next()
    })
 }
 
 export default authenticationTokenId;