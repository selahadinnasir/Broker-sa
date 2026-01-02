import asyncHandler from 'express-async-handler';

// @desc    Get broker profile
// @route   GET /api/brokers/profile
// @access  Private
export const getBrokerProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
