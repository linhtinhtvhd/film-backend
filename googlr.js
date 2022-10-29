import passport from 'passport'
import { Strategy } from 'passport-google-oauth2'
import UserModel from "./DAL/models/userModel";
const model = new UserModel();

const clienId="899710458061-11giqqai9maat01rk12h3o8o2unu8q0u.apps.googleusercontent.com"
const clienSecret ="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"

passport.use(new Strategy({
    clientID: clienId,
    clientSecret: clienSecret,
    callbackURL: "http://localhost:3001/auth/google/callback",
 
  },
  function(accessToken, refreshToken, profile, done) {
   
  model.findById(profile.id).then(data=>{
    if(data.length>0){
      const token = model.generateAccessTokenId(profile.id)
     
      done(null,{token:token,profile:data})
    }else{
      model.FindAndUpdate(profile).then(data=>{
        const token = model.generateAccessTokenId(profile.id)
       
            done(null,{token:token,profile:data})
      })
    }
  })
    })
  
)
passport.serializeUser((info,done)=>{
done(null,info)


})
passport.deserializeUser((info,done)=>{
    done(null,info)
    })