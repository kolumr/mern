import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from './models/products.model.js';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // React frontend
  credentials: true,              // if using cookies or sessions
}));

dotenv.config();

app.use(express.json()); //Allows us to accept json data in req.body

app.post("/api/products", async(req,res)=>{
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

app.delete("/api/products/:id", async(req,res)=>{
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({success:false, message:"Product not found"});
        }
        res.status(200).json({success:true, data: product});
    } catch (error) {
        console.error("Error in delete product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}
);
app.get("/api/products", async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({success:true, data: products});
    } catch (error) {
        console.error("Error in get products:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});
app.put("/api/products/:id", async(req,res)=>{
    const { id } = req.params;
    const productData = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, productData, {
            new: true,
            runValidators: true
        });
        if(!product){
            return res.status(404).json({success:false, message:"Product not found"});
        }
        res.status(200).json({success:true, data: product});
    } catch (error) {
        console.error("Error in update product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}
);
app.listen(5000,()=>{
    connectDB();
    console.log('server started at http://localhost:5000');
});

app.get("/products",(req,res)=>{
    res.send("Products pulled");
});

