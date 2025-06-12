import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from './models/products.model.js';

const app = express();
dotenv.config();

app.post("/products", async(req,res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    };

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

app.listen(5000,()=>{
    connectDB();
    console.log('server started at http://localhost:5000');
});

app.get("/products",(req,res)=>{
    res.send("Products pulled");
});

