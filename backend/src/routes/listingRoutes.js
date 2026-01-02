import express from 'express';
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getMyListings,
} from '../controllers/listingController.js';

import upload from '../middleware/uploadMiddleware.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getListings).post(protect, createListing);

router.get('/my', protect, getMyListings);

router
  .route('/:id')
  .get(getListingById)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

export default router;
