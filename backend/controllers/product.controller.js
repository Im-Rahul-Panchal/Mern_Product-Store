import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});   //if u pass empty object it  will fetch all the products of database
        res.status(200).json({ success : true ,"data" :products });
    } catch (error) {
        console.lof("error in fetching products ", error.message);
        res.status(500).json({success : false , message : "Server Error"})
    }
};





export const createProduct = async (req, res) =>{
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success : false, message : "Please provide all fields"})
    };
    //else
    const newProduct = new Product(product);    
    try {
        await newProduct.save();
        res.status(201).json({success : true, data : newProduct});
    } catch (error) {
        console.error("Error in Create Product", error.message);
        res.status(500).json({success : false, message : "Failed to create product"})
    }
};





export const updateProduct =  async (req , res) =>{
    const { id } = req.params;
    const product = req.body;    //user will send this 
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success : false, message : "Invalid product id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new : true});
        res.status(200).json({success : true, data : updatedProduct});
    } catch (error) {
        console.error("Error in Update Product", error.message);
        res.status(500).json({success : false, message : "Failed to update product"})        
    }
};





export const deleteProduct = async(req, res) =>{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success : false, message : "Invalid product id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success : true, message : "Product deleted successfully"});
    } catch (error) {
        console.error("Error in Deleting Product", error.message);
        res.status(500).json({success : false, message : "Product not found"})
    }
};