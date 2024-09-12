// const express = require('express');
// console.log(process.env.MONGO_URI);

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path';

import productRoutes from './routes/product.route.js' 

dotenv.config()
const PORT = process.env.PORT  // or we can use process.env.PORT || 5000
const app = express();

const __dirname = path.resolve();

app.use(express.json());  //allows user to accept JSON data in the req.body  (it is a middleware)

app.use("/api/products",productRoutes)  //prefix hai route ka


//deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"));
    })
}



app.listen(PORT, () =>{
    connectDB();
    console.log('Server is running at http://localhost:'+PORT);
});
 