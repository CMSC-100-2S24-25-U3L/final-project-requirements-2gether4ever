import express from 'express';
import UserTransaction from '../models/UserTransaction.js';
import Product from '../models/Product.js';

const router = express.Router();

// This is to CREATE: Will place a new order
router.post('/order', async (req, res) => {
    try {
        const { productId, orderQuantity, email } = req.body;

        // To fetch the intended product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Check if there is enough stock
        if (orderQuantity > product.quantity) {
            return res.status(400).json({ message: 'Insufficient product quantity' });
        }
        
        const now = new Date();
        const time = now.toLocaleTimeString();

        // To create the order
        const newOrder = new UserTransaction({
            productId,
            orderQuantity,
            email,
            time,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed', newOrder });
    } catch (error) {
        console.error('Order error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await UserTransaction.find().populate('productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all pending orders
router.get('/pending', async (req, res) => {
    try {
        const orders = await UserTransaction.find({ orderStatus: 0 }).populate('productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all completed orders
router.get('/completed', async (req, res) => {
    try {
        const orders = await UserTransaction.find({ orderStatus: 1 }).populate('productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all canceled orders
router.get('/canceled', async (req, res) => {
    try {
        const orders = await UserTransaction.find({ orderStatus: 2 }).populate('productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH: Confirm an order (Admin only)
router.patch('/confirm/:id', async (req, res) => {
    try {
        const order = await UserTransaction.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.orderStatus !== 0) {
            return res.status(400).json({ message: 'Only pending orders can be confirmed' });
        }

        // Decrease product quantity
        const product = await Product.findById(order.productId);
        if (product.quantity < order.orderQuantity) {
            return res.status(400).json({ message: 'Not enough stock to confirm order' });
        }

        product.quantity -= order.orderQuantity;
        await product.save();

        // Update status
        order.orderStatus = 1;
        await order.save();

        res.json({ message: 'Order confirmed', order });
    } catch (error) {
        console.error('Order error:', error);
        res.status(500).json({ message: error.message });
    }
});

// PATCH: Cancel an order (Customer only if still pending)
router.patch('/cancel/:id', async (req, res) => {
    try {
        const order = await UserTransaction.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.orderStatus !== 0) {
            return res.status(400).json({ message: 'Only pending orders can be canceled' });
        }

        order.orderStatus = 2;
        await order.save();

        res.json({ message: 'Order canceled', order });
    } catch (error) {
        console.error('Order error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET: Sales Report - Basic (total sales and products sold)
router.get('/sales-report', async (req, res) => {
    try {
        const completedOrders = await UserTransaction.find({ orderStatus: 1 }).populate('productId');

        let report = {};
        let totalSales = 0;

        completedOrders.forEach(order => {
            const productName = order.productId.name;
            const productPrice = order.productId.price;
            const income = productPrice * order.orderQuantity;

            if (!report[productName]) {
                report[productName] = { quantitySold: 0, income: 0 };
            }

            report[productName].quantitySold += order.orderQuantity;
            report[productName].income += income;
            totalSales += income;
        });

        res.json({ report, totalSales });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
