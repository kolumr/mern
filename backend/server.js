import express from "express";
import dotenv from "dotenv"
import { connectionDB } from "./config/db.js";
import Product from "./models/productmodel.js";

dotenv.config()
const app = express();

app.get('/', (req,res)=> {
    res.send('Started')
})
app.post('/products', async (res,res)=>{
    const product = req.body; //user will send this data

    if(!product.name || !product.image || !product.price){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in creating product", error.message);
        res.status(500).json({ success:"false", message: "Server Error"});
    }
})
app.listen(3000, () =>{
    connectionDB();
    console.log('Server started at 3000');
})