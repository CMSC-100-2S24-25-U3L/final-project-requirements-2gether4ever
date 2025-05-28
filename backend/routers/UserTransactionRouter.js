import express from 'express';
import UserTransaction from '../models/UserTransaction.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

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

// GET: Get all orders for a specific user
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.email) filter.email = req.query.email;
        const orders = await UserTransaction.find(filter).populate('productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all pending orders for a specific user
router.get('/pending', async (req, res) => {
    try {
        const filter = { orderStatus: 0 };
        if (req.query.email) filter.email = req.query.email;
        const orders = await UserTransaction.find(filter).populate('productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all completed orders for a specific user
router.get('/completed', async (req, res) => {
    try {
        const filter = { orderStatus: 1 };
        if (req.query.email) filter.email = req.query.email;
        const orders = await UserTransaction.find(filter).populate('productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all canceled orders for a specific user
router.get('/canceled', async (req, res) => {
    try {
        const filter = { orderStatus: 2 };
        if (req.query.email) filter.email = req.query.email;
        const orders = await UserTransaction.find(filter).populate('productId');
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

// Cancel an order by ID (set orderStatus to 2)
router.patch('/cancel/:id', async (req, res) => {
  try {
    const order = await UserTransaction.findByIdAndUpdate(
      req.params.id,
      { orderStatus: 2 },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH: Update order status (Approve/Confirm or Cancel)
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await UserTransaction.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Only allow status change if order is pending
        if (order.orderStatus !== 0) {
            return res.status(400).json({ message: 'Only pending orders can be updated' });
        }

        if (status === 1) { // Approve/Confirm
            // Decrease product quantity
            const product = await Product.findById(order.productId);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            if (product.quantity < order.orderQuantity) {
                return res.status(400).json({ message: 'Not enough stock to confirm order' });
            }
            product.quantity -= order.orderQuantity;
            await product.save();
            order.orderStatus = 1;
            await order.save();
            return res.json({ message: 'Order confirmed', order });
        } else if (status === 2) { // Cancel
            order.orderStatus = 2;
            await order.save();
            return res.json({ message: 'Order canceled', order });
        } else {
            return res.status(400).json({ message: 'Invalid status value' });
        }
    } catch (error) {
        console.error('Order error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET: Sales Report - Summary by week, month, or year
router.get('/sales-report', async (req, res) => {
    try {
        const range = req.query.range || 'weekly'; // default to weekly
        let groupId, dateFormat;

        if (range === 'monthly') {
            // Group by year and month
            groupId = { year: { $year: "$dateOrdered" }, month: { $month: "$dateOrdered" } };
            dateFormat = "%Y-%m";
        } else if (range === 'annual') {
            // Group by year
            groupId = { year: { $year: "$dateOrdered" } };
            dateFormat = "%Y";
        } else {
            // Default: group by ISO week and year
            groupId = { year: { $year: "$dateOrdered" }, week: { $isoWeek: "$dateOrdered" } };
            dateFormat = "%G-W%V"; // ISO week format
        }

        const sales = await UserTransaction.aggregate([
            { $match: { orderStatus: 1 } }, // Only completed orders
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            {
                $group: {
                    _id: groupId,
                    totalSales: { $sum: { $multiply: ["$orderQuantity", "$product.price"] } },
                    totalProductsSold: { $sum: "$orderQuantity" },
                    totalOrders: { $sum: 1 },
                    products: {
                        $push: {
                            name: "$product.name",
                            quantity: "$orderQuantity"
                        }
                    }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 } }
        ]);

        // Format the period label and find top product for each period
        const formatted = sales.map(item => {
            let period;
            if (range === 'monthly') {
                period = `${item._id.year}-${String(item._id.month).padStart(2, '0')}`;
            } else if (range === 'annual') {
                period = `${item._id.year}`;
            } else {
                period = `${item._id.year}-W${String(item._id.week).padStart(2, '0')}`;
            }

            // Find top product
            const productTotals = {};
            item.products.forEach(p => {
                productTotals[p.name] = (productTotals[p.name] || 0) + p.quantity;
            });
            const topProduct = Object.entries(productTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

            return {
                period,
                totalSales: item.totalSales,
                totalProductsSold: item.totalProductsSold,
                totalOrders: item.totalOrders,
                topProduct
            };
        });

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
