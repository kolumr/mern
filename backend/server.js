import express from "express";
import dotenv from "dotenv"
import { connectionDB } from "./config/db.js";
import Productroutes from "./routes/productroutes.js";

dotenv.config();

const app = express();

app.use(express.json()); //midleware that allows us to send data in json format from the api endpoints
app.use('/api/products',Productroutes)

app.listen(3000, () =>{
    connectionDB();
    console.log('Server started at 3000');
});