import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},

{
    timestamps: true  //will note the time of -> created at and updated at
})


const Product = mongoose.model("Product" , productSchema);

export default Product;