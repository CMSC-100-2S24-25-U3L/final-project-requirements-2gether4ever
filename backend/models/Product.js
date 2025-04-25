import mongoose from 'mongoose';

// model for product data
const Student = mongoose.model('Student', {
    id: Number,
    name: String,
    description: String,
    type: Number, // 1 = Crop, 2 = Poultry
    quantity: Number,
})