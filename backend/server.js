import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';

const app = express();
dotenv.config();
app.listen(5000,()=>{
    connectDB();
    console.log('server started at http://localhost:5000');
});

app.get("/products",(req,res)=>{
    res.send("Products pulled");
});

