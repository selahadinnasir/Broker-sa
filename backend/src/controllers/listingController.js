import asyncHandler from 'express-async-handler';
import Listing from '../models/Listing.js';

// @desc    Create listing
// @route   POST /api/listings
// @access  Private

export const createListing = asyncHandler(async (req, res) => {
  console.log('BODY when created:', req.body);

  const { title, description, price, location, type, images } = req.body;

  if (!title || !price || !location || !type) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const listing = await Listing.create({
    broker: req.user._id,
    title,
    description,
    price,
    location,
    type,
    images, // URLs from frontend
  });

  res.status(201).json(listing);
});

// @desc    Get all listings (public)
// @route   GET /api/listings
// @access  Public
export const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({
    status: 'active',
    isDeleted: false,
  })
    .populate('broker', 'name email')
    .sort({ createdAt: -1 });

  res.json(listings);
});

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
export const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate(
    'broker',
    'name email phone'
  );

  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }

  res.json(listing);
});

// @desc    Get logged-in broker listings
// @route   GET /api/listings/my
// @access  Private
export const getMyListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({
    broker: req.user._id,
    isDeleted: false,
  }).sort({
    createdAt: -1,
  });

  res.json(listings);
});

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private (owner or admin)
export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }

  if (
    listing.broker.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error('Not authorized');
  }

  const allowedFields = [
    'title',
    'description',
    'price',
    'location',
    'type',
    'images',
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      listing[field] = req.body[field];
    }
  });

  const updatedListing = await listing.save();

  res.json(updatedListing);
});

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (owner or admin)
// @desc    Soft delete listing
// @route   DELETE /api/listings/:id
// @access  Private (owner or admin)
export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing || listing.isDeleted) {
    res.status(404);
    throw new Error('Listing not found');
  }

  if (
    listing.broker.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error('Not authorized');
  }

  listing.isDeleted = true;
  await listing.save();

  res.json({ message: 'Listing deleted (soft)' });
});

// @desc    Mark listing as sold
// @route   PATCH /api/listings/:id/sold
// @access  Private (owner or admin)
export const markListingAsSold = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing || listing.isDeleted) {
    res.status(404);
    throw new Error('Listing not found');
  }

  // Authorization
  if (
    listing.broker.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(403);
    throw new Error('Not authorized');
  }

  listing.status = 'sold';
  await listing.save();

  res.json({
    message: 'Listing marked as sold',
    listing,
  });
});

// @desc    Hard delete listing (admin only)
// @route   DELETE /api/listings/:id/hard
// @access  Private (admin)
export const hardDeleteListing = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access required');
  }

  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }

  await listing.deleteOne();
  res.json({ message: 'Listing permanently deleted' });
});
