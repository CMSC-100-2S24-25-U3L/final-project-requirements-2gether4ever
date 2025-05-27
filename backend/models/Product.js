import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },

  category: {
    type: String,
    enum: [
      'Gulay',
      'Prutas',
      'Karne at itlog',
      'Bigas at Butil',
      'Mga Gawa sa Sakahan',
      'Organik'
    ],
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;


