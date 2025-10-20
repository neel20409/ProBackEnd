import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();
//data from frontend or crossorigin
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
//handling data in json foramt
app.use(express.json(
    {
        limit:"16kb",
    }
))
//handling data from url
app.use(express.urlencoded({extended:true,limit:"16kb"}))

//
app.use(express.static("public"))

//use cookies from user interfaceweb 
app.use(cookieParser())


export {app}