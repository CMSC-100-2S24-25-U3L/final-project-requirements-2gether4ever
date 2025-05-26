import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Add a product to the database
// Merchant and Admin only
router.post('/add', async (req, res) => {
  try {
    const { id, name, description, type, quantity, price } = req.body;

    // Validate required fields
    if (!name || !type || quantity == null || price == null) {
      return res.status(400).json({ message: 'Missing required fields: name, type, quantity, or price' });
    }

    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res.status(409).json({ message: 'Product with this id already exists' });
    }

    const newProduct = new Product({ id, name, description, type, quantity, price });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

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

// Delete a product
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ id: id });
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// Get all products
router.get('/list', async (req, res) => {
  try {
    const { sortBy, order = 'asc' } = req.query;
    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const products = await Product.find().sort(sortOptions);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Update inventory of products
router.put('/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

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

    await product.save();
    res.status(200).json({ message: 'Inventory updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
});

export default router;