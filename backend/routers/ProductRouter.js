import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// <<<<<<< backendFixes-nevi
//     const existingProduct = await Product.findOne({ id });
//     if (existingProduct) {
//       return res.status(409).json({ message: 'Product with this id already exists' });
//     }

//     const newProduct = new Product({ id, name, description, type, quantity, price });
//     await newProduct.save();
//     res.status(201).json({ message: 'Product added successfully', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding product', error: error.message });
// =======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// <<<<<<< customers
const upload = multer({ storage: storage });
// =======
// Update product details
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate if updates are provided
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    const updatedProduct = await Product.findOneAndUpdate({ id: id }, updates, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});
// >>>>>>> main

// GET all products
router.get('/', async (req, res) => {
  try {
// <<<<<<< customers
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
// =======
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ id: id });
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
// >>>>>>> main
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /admin/products - create new product with image upload
router.post('/admin/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, type, price, quantity } = req.body;

// <<<<<<< customers
//     const product = new Product({
//       name,
//       description,
//       category: type, // If you're using `category` in your model
//       price: parseFloat(price),
//       quantity: parseInt(quantity),
//       image: `/uploads/${req.file.filename}`
//     });
// =======
    if (quantity == null) {
      return res.status(400).json({ message: 'Quantity is required' });
    }

    // Change from findById to findOne({ id })
    const product = await Product.findOne({ id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update the product's quantity 
    if (typeof quantity !== 'number') {
      return res.status(400).json({ message: 'Quantity must be a number' });
    }
    product.quantity = quantity;
    if (product.quantity < 0) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
// >>>>>>> main

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
