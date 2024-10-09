import express from "express";
import dotenv from "dotenv"
import { connectionDB } from "./config/db.js";
import Product from "./models/productmodel.js";

dotenv.config();

const app = express();

app.use(express.json()); //midleware that allows us to send data in json format from the api endpoints

app.get('/', (req,res)=> {
    res.send('Started')
});

app.get('/api/products', async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(201).json({success:true, data: products});
    } catch (error) {
        console.error("Error in fetching products", error.message);
        res.status(500).json({ success:"false", message: "Server Error"});
    }
});

app.post('/api/products', async (req,res)=>{
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
});

app.delete('/api/products/:id', async (req,res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success:true, message: "Product deleted" });
    } catch (error) {
        res.status(404).json( {success: false, message: "Product not found"})
    }
});

app.listen(3000, () =>{
    connectionDB();
    console.log('Server started at 3000');
});