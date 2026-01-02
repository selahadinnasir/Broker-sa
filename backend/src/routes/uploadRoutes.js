import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// routes/uploadRoutes.js
// router.post('/', upload.array('images', 5), (req, res) => {
//   console.log('🔥 Upload route hit!');
//   console.log('FILES:', req.files);
//   console.log('BODY:', req.body);

//   res.json({ ok: true });
// });

// routes/uploadRoutes.js2
router.post('/', protect, upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = req.files.map((file) => file.path);

    res.json({ imageUrls });
  } catch (error) {
    console.error('UPLOAD ERROR:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;
