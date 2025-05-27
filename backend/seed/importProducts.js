import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const products = require('./product.json');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("MongoDB connected");

  await Product.deleteMany(); // Optional: clears existing
  await Product.insertMany(products);

  console.log("Products imported!");
  process.exit();
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
