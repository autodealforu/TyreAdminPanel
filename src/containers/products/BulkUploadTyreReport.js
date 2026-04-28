import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { URI } from '../../domain/constant';

const BulkUploadTyreReport = () => {
  const [file, setFile] = useState(null);
  const [vendorId, setVendorId] = useState('');
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const history = useHistory();

  // Fetch vendors on component mount
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoadingVendors(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URI}/api/vendors`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        // Assuming the API returns vendors in result.vendors or result.data
        const vendorsList = result.vendors || result.data || result;
        setVendors(Array.isArray(vendorsList) ? vendorsList : []);
      } else {
        console.error('Failed to fetch vendors');
        setVendors([]);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setVendors([]);
    } finally {
      setLoadingVendors(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setUploadResult(null);
    } else {
      alert('Please select a valid CSV file');
      e.target.value = '';
    }
  };

  const handleVendorIdChange = (e) => {
    setVendorId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a CSV file');
      return;
    }

    if (!vendorId.trim()) {
      alert('Please enter a vendor ID');
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('csvFile', file);
      formData.append('vendorId', vendorId.trim());

      const token = localStorage.getItem('token');

      const response = await fetch(`${URI}/api/products/bulk-upload-csv`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadResult({
          success: true,
          message: result.message,
          data: result.data || {},
        });
        setFile(null);
        setVendorId('');
        // Reset form
        document.getElementById('csvFileInput').value = '';
      } else {
        setUploadResult({
          success: false,
          message: result.message || 'Upload failed',
          errors: result.errors || [],
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: 'Network error. Please try again.',
        errors: [],
      });
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setVendorId('');
    setUploadResult(null);
    document.getElementById('csvFileInput').value = '';
  };

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title='Bulk Upload Tyre Report'
          mainLinkTitle='Dashboard'
          mainLinkUrl='/dashboard'
          activeLink='Bulk Upload Tyre Report'
        />

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <div
                className='card'
                style={{ boxShadow: 'rgb(227 233 243) 0px 4px 22px' }}
              >
                <div className='card-body'>
                  <div className='d-flex justify-content-between mb-3'>
                    <h4 className='card-title'>
                      Upload Filled Tyre Report CSV
                    </h4>
                    <button
                      onClick={() => history.push('/products')}
                      className='btn btn-secondary'
                    >
                      <i className='fa fa-arrow-left'></i> Back to Products
                    </button>
                  </div>

                  <div className='row'>
                    <div className='col-md-8'>
                      <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                          <label htmlFor='vendorId' className='form-label'>
                            <strong>Vendor *</strong>
                          </label>
                          <select
                            className='form-control'
                            id='vendorId'
                            value={vendorId}
                            onChange={handleVendorIdChange}
                            required
                            disabled={
                              uploading ||
                              loadingVendors ||
                              vendors.length === 0
                            }
                          >
                            <option value=''>
                              {loadingVendors
                                ? 'Loading vendors...'
                                : vendors.length === 0
                                ? 'No vendors available'
                                : 'Select a vendor'}
                            </option>
                            {vendors.map((vendor) => (
                              <option key={vendor._id} value={vendor._id}>
                                {vendor.vendor?.store_name ||
                                  vendor.name ||
                                  `Vendor ${vendor._id}`}
                                {vendor.vendor?.store_name &&
                                  ` (${vendor.name || vendor.email})`}
                              </option>
                            ))}
                          </select>
                          {vendors.length === 0 && !loadingVendors && (
                            <small className='form-text text-danger'>
                              No vendors found. Please create vendors first.
                            </small>
                          )}
                          {vendors.length > 0 && (
                            <small className='form-text text-muted'>
                              Select the vendor who will own these products
                            </small>
                          )}
                        </div>

                        <div className='mb-3'>
                          <label htmlFor='csvFileInput' className='form-label'>
                            <strong>CSV File *</strong>
                          </label>
                          <input
                            type='file'
                            className='form-control'
                            id='csvFileInput'
                            accept='.csv'
                            onChange={handleFileChange}
                            required
                            disabled={uploading}
                          />
                          <small className='form-text text-muted'>
                            Upload the filled tyre report CSV file with pricing
                            and stock information
                          </small>
                        </div>

                        <div className='d-flex gap-2'>
                          <button
                            type='submit'
                            className='btn btn-primary'
                            disabled={uploading || !file || !vendorId.trim()}
                          >
                            {uploading ? (
                              <>
                                <i className='fa fa-spinner fa-spin'></i>{' '}
                                Uploading...
                              </>
                            ) : (
                              <>
                                <i className='fa fa-upload'></i> Upload &
                                Process CSV
                              </>
                            )}
                          </button>
                          <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={handleReset}
                            disabled={uploading}
                          >
                            <i className='fa fa-refresh'></i> Reset
                          </button>
                        </div>
                      </form>

                      {uploadResult && (
                        <div
                          className={`alert ${
                            uploadResult.success
                              ? 'alert-success'
                              : 'alert-danger'
                          } mt-4`}
                        >
                          <h5>
                            <i
                              className={`fa ${
                                uploadResult.success
                                  ? 'fa-check-circle'
                                  : 'fa-exclamation-circle'
                              }`}
                            ></i>
                            {uploadResult.success
                              ? ' Upload Successful!'
                              : ' Upload Failed!'}
                          </h5>
                          <p>{uploadResult.message}</p>

                          {uploadResult.success && uploadResult.data && (
                            <div className='mt-3'>
                              {uploadResult.data.created && (
                                <p>
                                  <strong>Products Created:</strong>{' '}
                                  {uploadResult.data.created}
                                </p>
                              )}
                              {uploadResult.data.updated && (
                                <p>
                                  <strong>Products Updated:</strong>{' '}
                                  {uploadResult.data.updated}
                                </p>
                              )}
                              {uploadResult.data.skipped && (
                                <p>
                                  <strong>Products Skipped:</strong>{' '}
                                  {uploadResult.data.skipped}
                                </p>
                              )}
                            </div>
                          )}

                          {!uploadResult.success &&
                            uploadResult.errors &&
                            uploadResult.errors.length > 0 && (
                              <div className='mt-3'>
                                <strong>Errors:</strong>
                                <ul className='mb-0'>
                                  {uploadResult.errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </div>

                    <div className='col-md-4'>
                      <div className='card bg-light'>
                        <div className='card-body'>
                          <h5 className='card-title'>
                            <i className='fa fa-info-circle'></i> Instructions
                          </h5>
                          <ol className='small'>
                            <li>
                              First, download the tyre report CSV from the
                              Products page
                            </li>
                            <li>
                              Fill in the pricing information:
                              <ul>
                                <li>
                                  <code>tyre_cost</code> - Your cost for the
                                  tyre
                                </li>
                                <li>
                                  <code>tyre_price_mrp</code> - Maximum Retail
                                  Price
                                </li>
                                <li>
                                  <code>tyre_price_rcp</code> - Recommended
                                  Consumer Price
                                </li>
                                <li>
                                  <code>tyre_price_auto_deal</code> - Auto Deal
                                  Price
                                </li>
                              </ul>
                            </li>
                            <li>
                              Fill in stock information:
                              <ul>
                                <li>
                                  <code>stock</code> - Quantity in stock
                                </li>
                                <li>
                                  <code>in_stock</code> - true/false or YES/NO
                                </li>
                              </ul>
                            </li>
                            <li>
                              Set published status:
                              <ul>
                                <li>
                                  <code>published_status</code> - PUBLISHED or
                                  DRAFT
                                </li>
                              </ul>
                            </li>
                            <li>
                              Select the vendor from the dropdown and upload the
                              filled CSV
                            </li>
                          </ol>

                          <div className='alert alert-warning small mt-3'>
                            <strong>Note:</strong> Only rows with filled pricing
                            information will be processed as products.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadTyreReport;
