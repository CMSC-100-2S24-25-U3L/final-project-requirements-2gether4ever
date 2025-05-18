import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// instantiate the server
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(bodyParser.json());

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
app.use("/product", productRouter)
app.use("/user", userRouter)
app.use("/user-transaction", userTransactionRouter)

// 
app.listen(5000, () => { console.log('Server started at port 5000')} );