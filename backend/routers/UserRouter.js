import express from 'express';
import User from '../models/User.js'; // Your User model
import Product from '../models/Product.js';
import UserTransaction from '../models/UserTransaction.js';
import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register a new user (default userType: 'Customer')
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType: 'Customer', // Default to 'Customer'
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, userType: user.userType }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
            );

            res.json({
            token,
            user: {
                email: user.email,
                userType: user.userType,
            },
            });

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users 
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.userType) filter.userType = req.query.userType;
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /user/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user details
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, address, phone, birthday } = req.body;

    // Find user by ID and update the allowed fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, address, phone, birthday },
      { new: true, runValidators: true }
    ).select('-password'); 

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin summary route
router.get('/admin/summary', async (req, res) => {
  try {
    // Total customers
    const usersCount = await User.countDocuments({ userType: 'Customer' });

    // Total products
    const productsCount = await Product.countDocuments();

    // Total orders (assuming each UserTransaction is an order)
    const ordersCount = await UserTransaction.countDocuments();

    // Total sales (sum of all order totals)
    const salesAgg = await UserTransaction.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$total" } } }
    ]);
    const totalSales = salesAgg[0]?.totalSales || 0;

    res.json({
      users: usersCount,
      products: productsCount,
      orders: ordersCount,
      sales: totalSales
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  // Now you can access req.userEmail
  res.json({ email: req.userEmail });
});

export default router;
