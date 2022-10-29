import passport from 'passport';
import { Strategy } from 'passport-facebook'
import UserModel from "./DAL/models/userModel";
const model = new UserModel();

const clienId="677865990262320"
const clienSecret ="190759f47ea9be50fe5fade5d8790da4"

passport.use(new Strategy({
    clientID: clienId,
    clientSecret: clienSecret,
    callbackURL: "http://localhost:3001/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
  model.findById(profile.id).then(data=>{
    if(data.length>0){
      const token = model.generateAccessTokenId(profile.id)
      done(null,{token:token,profile:data})
    }else{
      model.FindAndUpdateFb(profile).then(data=>{
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