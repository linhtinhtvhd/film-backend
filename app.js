
import  express  from "express";

import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from 'morgan'
import cors from 'cors'
import './passport/googlr'
import passport from "passport";
import UserRouter from "./router/user";
import CommentRouter from "./router/comment";
import AuthRouter from './router/auth'


import { Database } from "./ConfigDb/configDb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;

const app = express();


app.use(session({
  secret: 'somethingsecretgoeshere',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false}
}));
// app.use(cors())
// const corsOptions = {
//   origin:'https://master--jolly-concha-8b8929.netlify.app',
//   credentials:true,
//   optionSuccessStatus:200
// }
app.use(cors())
app.use(morgan("dev"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", AuthRouter);
app.use(cookieParser());
app.get("/home",(req,res,next)=>{
  res.json(req.user)
})
app.use(express.static(path.join(__dirname, "public")));





app.use('/api/users', UserRouter);
app.use('/api/comments', CommentRouter);

const db= new Database()

app.listen(port||3001, () => {
    console.log(`Example app listening on port ${port||3001}`);
    db.Connect().then((err,result)=>{
      if(err) throw err;
      console.log('Database is connected !')
    })
  });