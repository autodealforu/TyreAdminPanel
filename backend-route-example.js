// Add this to your products routes file (e.g., productRoutes.js)

import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Adjust path as needed
import { generateTyreReport } from '../controllers/tyreController.js'; // Your existing controller
import {
  bulkUploadTyreReport,
  uploadCSV,
} from '../controllers/productController.js'; // New controller

const router = express.Router();

// Existing route
router.route('/generate-tyre-report').get(protect, generateTyreReport);

// New route for CSV upload
router
  .route('/bulk-upload-tyre-report')
  .post(protect, uploadCSV, bulkUploadTyreReport);

export default router;

/* 
IMPORTANT SETUP INSTRUCTIONS:

1. Install required dependencies:
   npm install multer csv-parser

2. Create uploads directory structure:
   mkdir -p uploads/csv

3. Add this route to your main app.js or server.js:
   app.use('/api/products', productRoutes);

4. Make sure your Product model schema includes these fields:
   - tyre (ObjectId ref to Tyre)
   - vendor (ObjectId ref to Vendor) 
   - tyre_cost (Number)
   - tyre_price_mrp (Number)
   - tyre_price_rcp (Number)
   - tyre_price_auto_deal (Number)
   - stock (Number)
   - in_stock (Boolean)
   - published_status (String, enum: ['PUBLISHED', 'DRAFT'])
   - product_status (String)

5. Expected CSV format:
   tyre_id,tyre_name,brand,tyre_width,aspect_ratio,rim_diameter,tyre_cost,tyre_price_mrp,tyre_price_rcp,tyre_price_auto_deal,stock,in_stock,published_status
   
6. Error handling:
   - Only processes rows with pricing/stock data
   - Validates tyre_id exists in database
   - Handles duplicate products (updates existing)
   - Returns detailed success/error counts
*/
