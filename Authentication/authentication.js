import jwt from 'jsonwebtoken'
 function authenticationToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token===null) return res.sendStatus(401)
    jwt.verify(token,'bWluZHgud2ViNjE=',(err,user) =>{
        if(err){   
            return res.sendStatus(403)
        }
     
        req.username = user.username
        req.id=user.id
       
        next()
    })
 }
 
 export default authenticationToken;