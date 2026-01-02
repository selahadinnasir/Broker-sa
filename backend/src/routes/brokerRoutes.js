import express from 'express';
import { getBrokerProfile } from '../controllers/brokerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getBrokerProfile);

export default router;
