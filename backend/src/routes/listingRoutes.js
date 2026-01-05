import express from 'express';
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getMyListings,
  hardDeleteListing,
  markListingAsSold,
} from '../controllers/listingController.js';

import upload from '../middleware/uploadMiddleware.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getListings).post(protect, createListing);

// Special routes first
router.get('/my', protect, getMyListings);

// Admin or special actions
router.patch('/:id/sold', protect, markListingAsSold);
router.delete('/:id/hard', protect, hardDeleteListing);

// Generic single listing operations
router
  .route('/:id')
  .get(getListingById)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

export default router;
