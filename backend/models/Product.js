import mongoose from 'mongoose';

// model for product data
const Product = mongoose.model('Product', {
    id: Number,
    name: String,
    description: String,
    type: Number, // 1 = Crop, 2 = Poultry
    quantity: Number,
})