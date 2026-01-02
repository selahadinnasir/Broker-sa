import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import brokerRoutes from './routes/brokerRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import listingRoutes from './routes/listingRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

connectDB();

const app = express();

app.use(
  cors({
    origin: ['when deployed', 'http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/brokers', brokerRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
