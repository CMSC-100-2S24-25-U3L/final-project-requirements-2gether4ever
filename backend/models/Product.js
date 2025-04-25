import mongoose from 'mongoose';

// Schema for product data
const productSchema = new mongoose.Schema({
    id: { type: String, required: true }, // Product ID
    name: { type: String, required: true }, 
    description: { type: String, required: true }, 
    type: { type: Number, required: true, enum: [1, 2] }, // Product Type: 1 = Crop, 2 = Poultry
    quantity: { type: Number, required: true }, 
});

const Product = mongoose.model('Product', productSchema);

export default Product;