import express from "express";
import dotenv from "dotenv"
import { connectionDB } from "./config/db.js";

dotenv.config()
const app = express();

app.get('/', (req,res)=> {
    res.send('Started')
})

app.listen(3000, () =>{
    connectionDB();
    console.log('Server started at 3000');
})

//EEdrd2Oa2GWltqxk