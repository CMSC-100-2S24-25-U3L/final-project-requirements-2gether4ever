import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// instantiate the server
const app = express();

//? idk if we will use this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? or this
// app.use(cors());
// app.use(bodyParser.json());

//!! Router imports
// import productRouter from './routers/ProductRouter.js';
// import userRouter from './routers/UserRouter.js';
// import userTransactionRouter from './routers/UserTransactionRouter.js';
// app.use("/product", productRouter)
// app.use("/user", userRouter)
// app.use("/user-transaction", userTransactionRouter)
// app.use("/", )

// 
app.listen(3000, () => { console.log('Server started at port 3000')} );