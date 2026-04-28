import asyncHandler from 'express-async-handler';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import TyreModel from '../tyres/TyreModel.js';
import ProductModel from '../products/ProductModel.js'; // Adjust path as needed
import VendorModel from '../vendors/VendorModel.js'; // Adjust path as needed

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/csv';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// @desc    Upload and process CSV file for bulk tyre report
// @route   POST /api/products/bulk-upload-tyre-report
// @access  Private (Admin/Vendor)
const bulkUploadTyreReport = asyncHandler(async (req, res) => {
  try {
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: 'Vendor ID is required',
      });
    }

    // Verify vendor exists
    const vendor = await VendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'CSV file is required',
      });
    }

    const filePath = req.file.path;
    const results = [];
    const errors = [];
    let processed = 0;
    let created = 0;
    let updated = 0;
    let skipped = 0;

    // Parse CSV file
    const csvPromise = new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    await csvPromise;

    // Process each row
    for (const [index, row] of results.entries()) {
      try {
        processed++;
        const rowNumber = index + 2; // +2 because CSV starts from row 2 (after header)

        // Validate required fields
        const tyreId = row.tyre_id?.trim();

        if (!tyreId) {
          errors.push(`Row ${rowNumber}: tyre_id is required`);
          skipped++;
          continue;
        }

        // Check if this row has any pricing/stock data (indicates vendor wants this tyre)
        const hasPricingData =
          row.tyre_cost?.trim() ||
          row.tyre_price_mrp?.trim() ||
          row.tyre_price_rcp?.trim() ||
          row.tyre_price_auto_deal?.trim() ||
          row.stock?.trim() ||
          row.in_stock?.trim() ||
          row.published_status?.trim();

        if (!hasPricingData) {
          skipped++;
          continue; // Skip rows without any vendor data
        }

        // Verify tyre exists
        const tyre = await TyreModel.findById(tyreId);
        if (!tyre) {
          errors.push(`Row ${rowNumber}: Tyre with ID ${tyreId} not found`);
          skipped++;
          continue;
        }

        // Parse pricing and stock data
        const productData = {
          tyre: tyreId,
          vendor: vendorId,
          tyre_cost: parseFloat(row.tyre_cost) || 0,
          tyre_price_mrp: parseFloat(row.tyre_price_mrp) || 0,
          tyre_price_rcp: parseFloat(row.tyre_price_rcp) || 0,
          tyre_price_auto_deal: parseFloat(row.tyre_price_auto_deal) || 0,
          stock: parseInt(row.stock) || 0,
          in_stock: parseBooleanField(row.in_stock),
          published_status:
            row.published_status?.trim().toUpperCase() === 'PUBLISHED'
              ? 'PUBLISHED'
              : 'DRAFT',
          product_status: 'Active', // Default status
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Check if product already exists for this tyre and vendor
        const existingProduct = await ProductModel.findOne({
          tyre: tyreId,
          vendor: vendorId,
        });

        if (existingProduct) {
          // Update existing product
          await ProductModel.findByIdAndUpdate(existingProduct._id, {
            ...productData,
            updatedAt: new Date(),
          });
          updated++;
        } else {
          // Create new product
          await ProductModel.create(productData);
          created++;
        }
      } catch (error) {
        console.error(`Error processing row ${index + 2}:`, error);
        errors.push(`Row ${index + 2}: ${error.message}`);
        skipped++;
      }
    }

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    // Prepare response
    const responseData = {
      processed,
      created,
      updated,
      skipped,
      errors: errors.length,
    };

    if (errors.length > 0 && created === 0 && updated === 0) {
      return res.status(400).json({
        success: false,
        message: 'CSV processing failed. No products were created or updated.',
        data: responseData,
        errors: errors.slice(0, 10), // Limit errors shown to first 10
      });
    }

    res.status(200).json({
      success: true,
      message: `CSV processed successfully. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`,
      data: responseData,
      errors: errors.length > 0 ? errors.slice(0, 5) : undefined, // Show first 5 errors if any
    });
  } catch (error) {
    console.error('Bulk Upload Tyre Report Error:', error);

    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message:
        error.message || 'Something went wrong while processing the CSV file.',
    });
  }
});

// Helper function to parse boolean fields
const parseBooleanField = (value) => {
  if (!value) return false;
  const cleanValue = value.toString().trim().toLowerCase();
  return (
    cleanValue === 'true' ||
    cleanValue === 'yes' ||
    cleanValue === '1' ||
    cleanValue === 'y'
  );
};

// Middleware for handling file upload
const uploadCSV = upload.single('csvFile');

export { bulkUploadTyreReport, uploadCSV };
