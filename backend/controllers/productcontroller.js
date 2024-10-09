import Product from "../models/productmodel.js";
import mongoose from "mongoose";

export const getProduct = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(201).json({success:true, data: products});
    } catch (error) {
        console.error("Error in fetching products", error.message);
        res.status(500).json({ success:"false", message: "Server Error"});
    }
}

export const createProduct = async (req,res)=>{
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
}

export const updateProduct =  async (req,res) => {
    const {id} = req.params;
    const product = req.body;
    console.log(product);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product Id"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new : true});
        res.status(200).json({ success:true, message: "Product updated", data: updatedProduct });
    } catch (error) {
        res.status(404).json( {success: false, message: "Product not found"})
    }
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success:true, message: "Product deleted" });
    } catch (error) {
        res.status(404).json( {success: false, message: "Product not found"})
    }
}