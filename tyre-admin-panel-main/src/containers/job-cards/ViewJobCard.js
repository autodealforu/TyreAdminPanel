import React from 'react';
import SingleView from '../../components/common/SingleView';
import Spinner from '../../components/layout/Spinner';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import {
  inputFields,
  LINK_URL,
  PAGE_SINGLE_TITLE,
  PAGE_TITLE,
  SIDEBAR_OPTIONS,
} from '../../shared/enums/job_cards_enum';
import { useSingleJobCard } from '../../shared/hooks/UseJobCard';

const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    
    #printable-job-card, #printable-job-card * {
      visibility: visible;
    }
    
    #printable-job-card {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    
    .no-print {
      display: none !important;
    }
    
    .card {
      border: 1px solid #dee2e6 !important;
      page-break-inside: avoid;
      box-shadow: none !important;
    }
    
    .card-header {
      background-color: #f8f9fa !important;
      border-bottom: 2px solid #dee2e6 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-primary {
      background-color: #0d6efd !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-success {
      background-color: #198754 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-warning {
      background-color: #ffc107 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-info {
      background-color: #0dcaf0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-secondary {
      background-color: #6c757d !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-danger {
      background-color: #dc3545 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-light {
      background-color: #f8f9fa !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .bg-dark {
      background-color: #212529 !important;
      color: white !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .text-white {
      color: white !important;
    }
    
    .text-primary {
      color: #0d6efd !important;
    }
    
    .text-success {
      color: #198754 !important;
    }
    
    .text-warning {
      color: #ffc107 !important;
    }
    
    .badge {
      border: 1px solid #dee2e6;
      padding: 0.35em 0.65em;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    table {
      page-break-inside: auto;
    }
    
    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
    
    .table-hover tbody tr:hover {
      background-color: transparent !important;
    }
    
    h3, h4, h5 {
      page-break-after: avoid;
    }
    
    .shadow-sm {
      box-shadow: none !important;
    }
    
    .card-body {
      padding: 0.75rem !important;
    }
    
    .row.mb-4 {
      margin-bottom: 1rem !important;
    }
    
    .mb-2 {
      margin-bottom: 0.35rem !important;
    }
    
    .mb-3 {
      margin-bottom: 0.5rem !important;
    }
    
    .pb-3 {
      padding-bottom: 0.5rem !important;
    }
    
    h5 {
      font-size: 1rem !important;
      margin-bottom: 0.5rem !important;
    }
    
    .card-header h5 {
      margin-bottom: 0 !important;
    }
  }
`;

const ViewTechnician = ({ match }) => {
  const [data] = useSingleJobCard(match.params.id);
  const { job_card_loading, job_card } = data;

  return (
    <div className='pace-done'>
      <style>{printStyles}</style>
      <div>
        <div className='no-print'>
          <Header />
          <BreadCrumb
            title={PAGE_SINGLE_TITLE}
            mainLinkTitle={PAGE_TITLE}
            mainLinkUrl={LINK_URL}
            activeLink='View'
          />
        </div>
        {!job_card_loading ? (
          job_card && (
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-12'>
                  <div className='card'>
                    <div className='card-header no-print'>
                      <h4 className='card-title'>Job Card Details</h4>
                      <div className='d-flex gap-2'>
                        <a
                          href={`/${LINK_URL}/${job_card._id}/edit`}
                          className='btn btn-primary btn-sm'
                        >
                          Edit Job Card
                        </a>
                        <button
                          className='btn btn-secondary btn-sm'
                          onClick={() => window.print()}
                        >
                          Print
                        </button>
                      </div>
                    </div>
                    <div className='card-body' id='printable-job-card'>
                      {/* Header with Job Card Number and Status */}
                      <div className='row mb-4 pb-3 border-bottom'>
                        <div className='col-md-8'>
                          <h3 className='mb-0'>
                            Job Card #{job_card.job_card_number || 'N/A'}
                          </h3>
                          <small className='text-muted'>
                            Created:{' '}
                            {job_card.createdAt
                              ? new Date(job_card.createdAt).toLocaleDateString(
                                  'en-IN'
                                )
                              : 'N/A'}
                          </small>
                        </div>
                        <div className='col-md-4 text-end'>
                          <div className='mb-2'>
                            <small className='text-muted d-block mb-1'>
                              Service Status
                            </small>
                            <span
                              className={`badge badge-lg fs-6 ${
                                job_card.service_status === 'Completed'
                                  ? 'bg-success'
                                  : job_card.service_status === 'In Progress'
                                  ? 'bg-warning'
                                  : 'bg-secondary'
                              }`}
                            >
                              {job_card.service_status || 'Pending'}
                            </span>
                          </div>
                          {job_card.status && (
                            <div>
                              <small className='text-muted d-block mb-1'>
                                Job Card Status
                              </small>
                              <span className='badge bg-info fs-6'>
                                {job_card.status.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Customer & Vehicle Information */}
                      <div className='row mb-4'>
                        <div className='col-md-6'>
                          <div className='card bg-light shadow-sm'>
                            <div className='card-body'>
                              <h5 className='text-primary mb-3'>
                                <i className='fas fa-user me-2'></i>Customer
                                Information
                              </h5>
                              <div className='row mb-2'>
                                <div className='col-5'>
                                  <strong>Name:</strong>
                                </div>
                                <div className='col-7'>
                                  {job_card.customer?.name ||
                                    job_card.customer?.username ||
                                    'N/A'}
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-5'>
                                  <strong>Phone:</strong>
                                </div>
                                <div className='col-7'>
                                  {job_card.customer?.phone || 'N/A'}
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-5'>
                                  <strong>Email:</strong>
                                </div>
                                <div className='col-7'>
                                  {job_card.customer?.email || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='card bg-light shadow-sm'>
                            <div className='card-body'>
                              <h5 className='text-primary mb-3'>
                                <i className='fas fa-car me-2'></i>Vehicle
                                Information
                              </h5>
                              <div className='row mb-2'>
                                <div className='col-5'>
                                  <strong>Vehicle No:</strong>
                                </div>
                                <div className='col-7'>
                                  <span className='badge bg-dark fs-6'>
                                    {job_card.vehicle?.vehicle_number || 'N/A'}
                                  </span>
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-5'>
                                  <strong>Make/Model:</strong>
                                </div>
                                <div className='col-7'>
                                  {job_card.vehicle?.make}{' '}
                                  {job_card.vehicle?.model} (
                                  {job_card.vehicle?.year})
                                </div>
                              </div>
                              <div className='row mb-2'>
                                <div className='col-5'>
                                  <strong>Vendor:</strong>
                                </div>
                                <div className='col-7'>
                                  {job_card.vendor?.name || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Service Information */}
                      <div className='row mb-4'>
                        <div className='col-12'>
                          <div className='card bg-light shadow-sm'>
                            <div className='card-body'>
                              <h5 className='text-primary mb-3'>
                                <i className='fas fa-wrench me-2'></i>Service
                                Details
                              </h5>
                              <div className='row'>
                                <div className='col-md-3 mb-3'>
                                  <strong>Service Type:</strong>
                                  <br />
                                  <span
                                    className={`badge mt-1 ${
                                      job_card.service_type === 'Maintenance'
                                        ? 'bg-info'
                                        : job_card.service_type === 'Repair'
                                        ? 'bg-warning'
                                        : 'bg-success'
                                    }`}
                                  >
                                    {job_card.service_type || 'N/A'}
                                  </span>
                                </div>
                                <div className='col-md-3 mb-3'>
                                  <strong>Service Date:</strong>
                                  <br />
                                  {job_card.service_date
                                    ? new Date(
                                        job_card.service_date
                                      ).toLocaleDateString('en-IN')
                                    : 'N/A'}
                                </div>
                                <div className='col-md-3 mb-3'>
                                  <strong>Technician:</strong>
                                  <br />
                                  {job_card.service_technician?.name ||
                                    'Not Assigned'}
                                </div>
                                <div className='col-md-3 mb-3'>
                                  <strong>Odometer:</strong>
                                  <br />
                                  {job_card.odometer_reading || 'N/A'} km
                                </div>
                              </div>
                              {job_card.service_notes && (
                                <div className='mt-3 pt-3 border-top'>
                                  <strong>Service Notes:</strong>
                                  <p className='mb-0 mt-2'>
                                    {job_card.service_notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Form Type & Vehicle Details */}
                      {(job_card.form_type?.length > 0 ||
                        job_card.brake_pad_status ||
                        job_card.next_service_due_odometer_reading) && (
                        <div className='row mb-4'>
                          <div className='col-12'>
                            <div className='card bg-light shadow-sm'>
                              <div className='card-body'>
                                <h5 className='text-primary mb-3'>
                                  <i className='fas fa-clipboard-list me-2'></i>
                                  Additional Details
                                </h5>
                                <div className='row'>
                                  {job_card.form_type?.length > 0 && (
                                    <div className='col-md-6 mb-3'>
                                      <strong>Form Type:</strong>
                                      <br />
                                      <div className='mt-1'>
                                        {job_card.form_type.map((type, idx) => (
                                          <span
                                            key={idx}
                                            className='badge bg-secondary me-1 mb-1'
                                          >
                                            {type}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {job_card.brake_pad_status && (
                                    <div className='col-md-3 mb-3'>
                                      <strong>Brake Pad Status:</strong>
                                      <br />
                                      <span className='badge bg-warning mt-1'>
                                        {job_card.brake_pad_status}/5
                                      </span>
                                    </div>
                                  )}
                                  {job_card.next_service_due_odometer_reading && (
                                    <div className='col-md-3 mb-3'>
                                      <strong>Next Service Due:</strong>
                                      <br />
                                      {
                                        job_card.next_service_due_odometer_reading
                                      }{' '}
                                      km
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Services Used */}
                      {job_card.services_used &&
                        job_card.services_used.length > 0 && (
                          <div className='mb-4'>
                            <div className='card shadow-sm'>
                              <div className='card-header bg-primary text-white'>
                                <h5 className='mb-0'>
                                  <i className='fas fa-tools me-2'></i>Services
                                  Used
                                </h5>
                              </div>
                              <div className='card-body p-0'>
                                <div className='table-responsive'>
                                  <table className='table table-hover mb-0'>
                                    <thead className='table-light'>
                                      <tr>
                                        <th>#</th>
                                        <th>Service Name</th>
                                        <th>Cost</th>
                                        <th>Qty</th>
                                        <th>Tax Type</th>
                                        <th>Tax (%)</th>
                                        <th>Discount</th>
                                        <th className='text-end'>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {job_card.services_used.map(
                                        (service, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                              <strong>
                                                {service.service_name || 'N/A'}
                                              </strong>
                                            </td>
                                            <td>
                                              ₹
                                              {service.service_cost?.toFixed(
                                                2
                                              ) || '0.00'}
                                            </td>
                                            <td>
                                              {service.service_quantity || 0}
                                            </td>
                                            <td>
                                              <span className='badge bg-info'>
                                                {service.tax_type || 'N/A'}
                                              </span>
                                            </td>
                                            <td>{service.service_tax || 0}%</td>
                                            <td>
                                              ₹{service.service_discount || 0}
                                              {service.service_discount_type && (
                                                <small className='text-muted'>
                                                  {' '}
                                                  (
                                                  {
                                                    service.service_discount_type
                                                  }
                                                  )
                                                </small>
                                              )}
                                            </td>
                                            <td className='text-end'>
                                              <strong>
                                                ₹
                                                {service.service_total_cost?.toFixed(
                                                  2
                                                ) || '0.00'}
                                              </strong>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Products Used */}
                      {job_card.products_used &&
                        job_card.products_used.length > 0 && (
                          <div className='mb-4'>
                            <div className='card shadow-sm'>
                              <div className='card-header bg-success text-white'>
                                <h5 className='mb-0'>
                                  <i className='fas fa-box me-2'></i>Products
                                  Used
                                </h5>
                              </div>
                              <div className='card-body p-0'>
                                <div className='table-responsive'>
                                  <table className='table table-hover mb-0'>
                                    <thead className='table-light'>
                                      <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Cost</th>
                                        <th>Qty</th>
                                        <th>Tax Type</th>
                                        <th>Tax (%)</th>
                                        <th>Discount</th>
                                        <th className='text-end'>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {job_card.products_used.map(
                                        (product, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                              <strong>
                                                {product.product_name || 'N/A'}
                                              </strong>
                                            </td>
                                            <td>
                                              <span className='badge bg-secondary'>
                                                {product.product_category ||
                                                  'N/A'}
                                              </span>
                                            </td>
                                            <td>
                                              ₹
                                              {product.product_cost?.toFixed(
                                                2
                                              ) || '0.00'}
                                            </td>
                                            <td>
                                              {product.product_quantity || 0}
                                            </td>
                                            <td>
                                              <span className='badge bg-info'>
                                                {product.tax_type || 'N/A'}
                                              </span>
                                            </td>
                                            <td>{product.product_tax || 0}%</td>
                                            <td>
                                              ₹{product.product_discount || 0}
                                              {product.product_discount_type && (
                                                <small className='text-muted'>
                                                  {' '}
                                                  (
                                                  {
                                                    product.product_discount_type
                                                  }
                                                  )
                                                </small>
                                              )}
                                            </td>
                                            <td className='text-end'>
                                              <strong>
                                                ₹
                                                {product.product_total_cost?.toFixed(
                                                  2
                                                ) || '0.00'}
                                              </strong>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Parts Used */}
                      {job_card.service_parts_used &&
                        job_card.service_parts_used.length > 0 && (
                          <div className='mb-4'>
                            <div className='card shadow-sm'>
                              <div className='card-header bg-warning text-dark'>
                                <h5 className='mb-0'>
                                  <i className='fas fa-cog me-2'></i>Parts Used
                                </h5>
                              </div>
                              <div className='card-body p-0'>
                                <div className='table-responsive'>
                                  <table className='table table-hover mb-0'>
                                    <thead className='table-light'>
                                      <tr>
                                        <th>#</th>
                                        <th>Part Name</th>
                                        <th>Cost</th>
                                        <th>Qty</th>
                                        <th>Tax Type</th>
                                        <th>Tax (%)</th>
                                        <th>Discount</th>
                                        <th className='text-end'>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {job_card.service_parts_used.map(
                                        (part, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                              <strong>
                                                {part.part_name || 'N/A'}
                                              </strong>
                                            </td>
                                            <td>
                                              ₹
                                              {part.part_cost?.toFixed(2) ||
                                                '0.00'}
                                            </td>
                                            <td>{part.part_quantity || 0}</td>
                                            <td>
                                              <span className='badge bg-info'>
                                                {part.tax_type || 'N/A'}
                                              </span>
                                            </td>
                                            <td>{part.part_tax || 0}%</td>
                                            <td>
                                              ₹{part.part_discount || 0}
                                              {part.part_discount_type && (
                                                <small className='text-muted'>
                                                  {' '}
                                                  ({part.part_discount_type})
                                                </small>
                                              )}
                                            </td>
                                            <td className='text-end'>
                                              <strong>
                                                ₹
                                                {part.part_total_cost?.toFixed(
                                                  2
                                                ) || '0.00'}
                                              </strong>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Cost Summary & Payment */}
                      <div className='row mb-4'>
                        <div className='col-md-6 mb-3'>
                          <div className='card shadow-sm border-info'>
                            <div className='card-header bg-info text-white'>
                              <h5 className='mb-0'>
                                <i className='fas fa-calculator me-2'></i>Cost
                                Summary
                              </h5>
                            </div>
                            <div className='card-body'>
                              <div className='d-flex justify-content-between mb-2 pb-2 border-bottom'>
                                <span>Services Total:</span>
                                <strong>
                                  ₹
                                  {(
                                    job_card.services_used?.reduce(
                                      (sum, s) =>
                                        sum + (s.service_total_cost || 0),
                                      0
                                    ) || 0
                                  ).toFixed(2)}
                                </strong>
                              </div>
                              <div className='d-flex justify-content-between mb-2 pb-2 border-bottom'>
                                <span>Products Total:</span>
                                <strong>
                                  ₹
                                  {(
                                    job_card.products_used?.reduce(
                                      (sum, p) =>
                                        sum + (p.product_total_cost || 0),
                                      0
                                    ) || 0
                                  ).toFixed(2)}
                                </strong>
                              </div>
                              <div className='d-flex justify-content-between mb-2 pb-2 border-bottom'>
                                <span>Parts Total:</span>
                                <strong>
                                  ₹
                                  {(
                                    job_card.service_parts_used?.reduce(
                                      (sum, p) =>
                                        sum + (p.part_total_cost || 0),
                                      0
                                    ) || 0
                                  ).toFixed(2)}
                                </strong>
                              </div>
                              <div className='d-flex justify-content-between mb-3 pb-3 border-bottom'>
                                <span>Labor Cost:</span>
                                <strong>
                                  ₹
                                  {(job_card.service_labor_cost || 0).toFixed(
                                    2
                                  )}
                                </strong>
                              </div>
                              <div className='d-flex justify-content-between align-items-center'>
                                <h5 className='mb-0'>Grand Total:</h5>
                                <h4 className='mb-0 text-success'>
                                  ₹
                                  {(job_card.service_total_cost || 0).toFixed(
                                    2
                                  )}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-6 mb-3'>
                          <div className='card shadow-sm border-primary'>
                            <div className='card-header bg-primary text-white'>
                              <h5 className='mb-0'>
                                <i className='fas fa-credit-card me-2'></i>
                                Payment Information
                              </h5>
                            </div>
                            <div className='card-body'>
                              <div className='mb-3'>
                                <strong>Payment Status:</strong>
                                <div className='mt-1'>
                                  <span
                                    className={`badge badge-lg fs-6 ${
                                      job_card.service_payment_status === 'Paid'
                                        ? 'bg-success'
                                        : 'bg-danger'
                                    }`}
                                  >
                                    {job_card.service_payment_status ||
                                      'Unpaid'}
                                  </span>
                                </div>
                              </div>
                              <div className='mb-3'>
                                <strong>Payment Method:</strong>
                                <div className='mt-1'>
                                  {job_card.service_payment_method || 'N/A'}
                                </div>
                              </div>
                              <div className='mb-3'>
                                <strong>Payment Date:</strong>
                                <div className='mt-1'>
                                  {job_card.service_payment_date
                                    ? new Date(
                                        job_card.service_payment_date
                                      ).toLocaleDateString('en-IN')
                                    : 'N/A'}
                                </div>
                              </div>
                              {job_card.service_rating && (
                                <div>
                                  <strong>Service Rating:</strong>
                                  <div className='mt-1'>
                                    {[...Array(5)].map((_, i) => (
                                      <span
                                        key={i}
                                        className={`fs-5 text-${
                                          i < job_card.service_rating
                                            ? 'warning'
                                            : 'muted'
                                        }`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                    <span className='ms-2'>
                                      ({job_card.service_rating}/5)
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Checklist */}
                      {job_card.check_list &&
                        job_card.check_list.length > 0 && (
                          <div className='mb-4'>
                            <div className='card shadow-sm'>
                              <div className='card-header bg-secondary text-white'>
                                <h5 className='mb-0'>
                                  <i className='fas fa-check-square me-2'></i>
                                  Checklist
                                </h5>
                              </div>
                              <div className='card-body'>
                                <ul className='list-group list-group-flush'>
                                  {job_card.check_list.map((item, index) => (
                                    <li key={index} className='list-group-item'>
                                      <i className='fas fa-check-circle text-success me-2'></i>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                      {/* Service Feedback */}
                      {job_card.service_feedback && (
                        <div className='mb-4'>
                          <div className='card shadow-sm'>
                            <div className='card-header bg-warning'>
                              <h5 className='mb-0'>
                                <i className='fas fa-comment-alt me-2'></i>
                                Customer Feedback
                              </h5>
                            </div>
                            <div className='card-body'>
                              <p className='mb-0'>
                                {job_card.service_feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTechnician;
