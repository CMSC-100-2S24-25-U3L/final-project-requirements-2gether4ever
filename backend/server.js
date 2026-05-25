import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Needed to construct __dirname since you're using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Instantiate the server
const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://final-project-requirements-2gether4.vercel.app',
    'https://final-project-requirements-2gether4ever-3eo3h0cvv.vercel.app',
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g. mobile apps, curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
}));
app.use(bodyParser.json());
console.log("Static path:", path.join(__dirname, 'public/uploads'));
import fs from 'fs';

// Check if path exists at startup
const testPath = path.join(__dirname, 'public/uploads/ampalaya.png');
if (fs.existsSync(testPath)) {
    console.log('✅ Image file found at:', testPath);
} else {
    console.error('❌ Image file not found at:', testPath);
}

    app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Farm2Table', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Router imports
import productRouter from './routers/ProductRouter.js';
import userRouter from './routers/UserRouter.js';
import userTransactionRouter from './routers/UserTransactionRouter.js';

app.use("/api/products", productRouter);
app.use("/user", userRouter);
app.use("/user-transaction", userTransactionRouter);


app.listen(5000, () => { console.log('Server started at port 5000')} );
