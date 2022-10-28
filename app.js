
import  express  from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from 'morgan'
import cors from 'cors'
import './googlr.js'
import passport from "passport";
import UserRouter from "./router/user";
import CommentRouter from "./router/comment";
import AuthRouter from './auth'


import { Database } from "./ConfigDb/configDb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
const app = express();

// app.use(cors())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept","X-Auth-Token","Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(session({
  secret: 'somethingsecretgoeshere',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(morgan("dev"));




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