import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js' assert { type: "json" }; // if JSON module support isn't on
import products from './products.json' assert { type: "json" };

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
