import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    productId: "G001",
    name: "Ampalaya",
    description: "Fresh bitter melon from the local farm.",
    category: "Gulay",
    price: 45,
    quantity: 20,
    image: "/uploads/ampalaya.jpeg"
  },
  {
    productId: "F001",
    name: "Mango",
    description: "Sweet ripe mangoes, perfect for smoothies.",
    category: "Prutas",
    price: 60,
    quantity: 50,
    image: "/uploads/mango.jpeg"
  },
  {
    productId: "R001",
    name: "Dinorado Rice",
    description: "5kg premium dinorado rice.",
    category: "Bigas at Butil",
    price: 250,
    quantity: 15,
    image: "/uploads/dinorado.jpeg"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Farm2Table');
    console.log('Connected to MongoDB');

    await Product.deleteMany(); // clears old data
    await Product.insertMany(products);

    console.log('Seeded products successfully');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
}

seed();
