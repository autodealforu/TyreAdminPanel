import React, { useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import Spinner from '../../components/layout/Spinner';
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from '../../shared/enums/orders_enum';
import SingleView from '../../components/common/SingleView';
import {
  useSingleOrder,
  useUpdateOrder,
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
  useUpdateDeliveryCharges,
  useUpdatePayoutStatus,
} from '../../shared/hooks/UseOrder';
import * as qs from 'qs';
import {
  useSelectAllNotification,
  useUpdateNotification,
} from '../../shared/hooks/UseNotification';
import moment from 'moment';
import { ORDER_STATUS, URI } from '../../domain/constant';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { SelectBox } from '../../components/Form/Form';
import { useLoggedInUser } from '../../shared/hooks/UseAuth';
import { OrderUpdateCard } from '../../components/orders/OrderUpdateCard';
import { OrderDispatch } from '../../components/orders/OrderDispatch';
import { Link } from 'react-router-dom';

const ViewOrder = ({ match }) => {
  const queryParams = qs.parse(window.location.search.replace('?', ''));
  const [data, reloadData] = useSingleOrder(match.params.id);
  const { order_loading, order, edit_order_loading } = data;
  const [user_data] = useLoggedInUser();
  const { user } = user_data;
  const [updateData] = useUpdateNotification();
  const [notificationParam, setNotificationParam] = useState(null);
  const [notificatiton_data, reloadNotificationData] =
    useSelectAllNotification();
  const [updateOrderData] = useUpdateOrderStatus();
  const [updatePayoutStatusData] = useUpdatePayoutStatus();

  const handlePayoutStatusToggle = async (vendorId, isPaid) => {
    const targetVendorId = vendorId || order.products?.[0]?.vendor?._id || order.products?.[0]?.vendor || order.vendor?._id || order.vendor;
    if (window.confirm(`Are you sure you want to mark this vendor payout as ${isPaid ? 'PAID' : 'UNPAID'}?`)) {
      await updatePayoutStatusData(order._id, {
        vendor_id: targetVendorId,
        is_paid: isPaid,
      });
      reloadData(order._id);
    }
  };
  useEffect(() => {
    if (notificationParam) {
      updateData(notificationParam, { is_read: true });
      reloadNotificationData();
    }
  }, [notificationParam]);
  console.log('QUERY PARAMS', queryParams);

  useEffect(() => {
    if (queryParams.notification) {
      setNotificationParam(queryParams.notification);
    }
  }, [queryParams && queryParams.notification]);

  const [editing, setEditing] = useState(false);

  const submitFormClicked = async (values) => {
    await updateOrderData(order._id, values);
    reloadData(order._id);
    setEditing(false);
  };

  // Debug logging
  useEffect(() => {
    if (order) {
      console.log('Order data:', order);
      console.log('Order products:', order.products);
      console.log('Shipping address:', order.shipping_address);
      console.log('Billing address:', order.billing_address);
    }
  }, [order]);

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='View'
        />

        {!order_loading ? (
          order && (
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12 mb-3'>
                  <div className='card'>
                    <div className='card-header d-flex justify-content-between align-items-center'>
                      <h4 className='card-title m-0'>
                        Order #{order.order_id} - {order.status}
                      </h4>
                      <a
                        href={`${URI}/api/orders/${order._id || order.order_id}/invoice`}
                        target='_blank'
                        rel='noreferrer'
                        className='btn btn-primary btn-sm'
                      >
                        <i className='bx bx-download me-1'></i> Download Tax Invoice (PDF)
                      </a>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-3'>
                          <strong>Order Date:</strong>
                          <div>
                            {order.order_date
                              ? new Date(order.order_date).toLocaleString()
                              : '-'}
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <strong>Payment Method:</strong>
                          <div>{order.payment_method || 'N/A'}</div>
                        </div>
                        <div className='col-md-3'>
                          <strong>Payment Status:</strong>
                          <div>{order.is_paid ? 'Paid' : 'Pending'}</div>
                        </div>
                        <div className='col-md-3'>
                          <strong>Total Amount:</strong>
                          <div>
                            ₹{order.total_amount?.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-9'>
                  <div className='card'>
                    <div className='card-header'>
                      <h4 className='card-title'> Products </h4>
                    </div>
                    <div className='card-body'>
                        <table className='table table-striped'>
                          <thead>
                            <tr>
                              <th> Item Summary </th>
                              <th> Vendor </th>
                              <th> Qty </th>
                              <th>Price</th>
                              <th> Total Price </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products && order.products.length > 0 ? (
                              order.products.map((item, idx) => {
                                return (
                                  <tr key={item._id || idx}>
                                    <td>
                                      {' '}
                                      {item.image && (
                                        <img
                                          src={`${URI}${item.image}`}
                                          style={{
                                            height: '75px',
                                            width: '75px',
                                            objectFit: 'contain',
                                          }}
                                          alt={item.name}
                                        />
                                      )}{' '}
                                      <div>
                                        <strong>{item.name}</strong>
                                        {item.brand && (
                                          <div
                                            className='text-muted'
                                            style={{ fontSize: '12px' }}
                                          >
                                            Brand: {item.brand}
                                          </div>
                                        )}
                                        {item.size && (
                                          <div
                                            className='text-muted'
                                            style={{ fontSize: '12px' }}
                                          >
                                            Size: {item.size}
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      {item.vendor_details?.name ||
                                        item.vendor_details?.store_name ||
                                        'N/A'}
                                      {item.vendor_details?.location && (
                                        <div
                                          className='text-muted'
                                          style={{ fontSize: '12px' }}
                                        >
                                          {item.vendor_details.location}
                                        </div>
                                      )}
                                    </td>
                                    <td> x {item.quantity} </td>
                                    <td>
                                      {' '}
                                      ₹{item.sale_price}{' '}
                                      {item.regular_price &&
                                        item.regular_price >
                                          item.sale_price && (
                                          <span
                                            style={{
                                              textDecoration: 'line-through',
                                              fontSize: '12px',
                                              color: '#999',
                                            }}
                                          >
                                            ₹{item.regular_price}
                                          </span>
                                        )}{' '}
                                    </td>
                                    <td>
                                      {' '}
                                      ₹
                                      {(
                                        item.quantity * item.sale_price
                                      ).toLocaleString('en-IN')}{' '}
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan='5'
                                  className='text-center text-muted'
                                >
                                  No products found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='card'>
                        <div className='card-header bg-light'>
                          <h4 className='card-title mb-0'>
                            <i className='fa fa-user mr-2'></i>Customer Details
                          </h4>
                        </div>
                        <div className='card-body'>
                          <div className='mb-3'>
                            <div className='text-muted small'>Name</div>
                            <div className='font-weight-bold'>
                              {(order.customer && order.customer.name) || 'N/A'}
                            </div>
                          </div>
                          {user && user.role === 'SUPER ADMIN' && (
                            <>
                              <div className='mb-3'>
                                <div className='text-muted small'>Phone</div>
                                <div className='font-weight-bold'>
                                  {(order.customer && order.customer.phone) ||
                                    'N/A'}
                                </div>
                              </div>
                              <div className='mb-3'>
                                <div className='text-muted small'>Email</div>
                                <div className='font-weight-bold'>
                                  {(order.customer && order.customer.email) ||
                                    'N/A'}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'> Vendor Details </h4>
                        </div>
                        <div className='card-body'>
                          {order.products && order.products.length > 0 ? (
                            // Get unique vendors from products array
                            [
                              ...new Set(
                                order.products
                                  .map(
                                    (p) =>
                                      p.vendor_details?.name ||
                                      p.vendor_details?.store_name ||
                                      p.vendor?.name ||
                                      p.vendor?.store_name ||
                                      'Vendor Store'
                                  )
                                  .filter(Boolean)
                              ),
                            ].map((vendorName, idx) => {
                              const vendorProduct = order.products.find(
                                (p) =>
                                  (p.vendor_details?.name ||
                                    p.vendor_details?.store_name ||
                                    p.vendor?.name ||
                                    p.vendor?.store_name ||
                                    'Vendor Store') === vendorName
                              );
                              const vendor = vendorProduct?.vendor;
                              const vendorDetails =
                                vendorProduct?.vendor_details;

                              return (
                                <div key={idx}>
                                  {idx > 0 && (
                                    <hr
                                      style={{
                                        borderTop: '2px solid #000',
                                        margin: '20px 0',
                                      }}
                                    />
                                  )}
                                  <div className='d-flex justify-content-between'>
                                    <div> Store Name </div>
                                    <div>
                                      <strong>
                                        {vendorDetails?.store_name ||
                                          vendorDetails?.name ||
                                          vendor?.store_name ||
                                          vendor?.name ||
                                          'N/A'}
                                      </strong>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className='d-flex justify-content-between'>
                                    <div> Phone </div>
                                    <div>
                                      <strong>
                                        {vendorDetails?.phone ||
                                          vendor?.phone ||
                                          'N/A'}
                                      </strong>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className='d-flex justify-content-between'>
                                    <div> Email </div>
                                    <div>
                                      <strong>{vendor?.email || 'N/A'}</strong>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className='d-flex justify-content-between'>
                                    <div> Location </div>
                                    <div>
                                      <strong>
                                        {vendorDetails?.location ||
                                          vendor?.location ||
                                          'N/A'}
                                      </strong>
                                    </div>
                                  </div>
                                  {vendor?.pickup_address &&
                                    Array.isArray(vendor.pickup_address) &&
                                    vendor.pickup_address.length > 0 &&
                                    vendor.pickup_address[0] && (
                                      <>
                                        <hr />
                                        <div className='d-flex justify-content-between'>
                                          <div> Pickup Address </div>
                                          <div>
                                            <strong>
                                              {
                                                vendor.pickup_address[0]?.address_1 || 'N/A'
                                              }
                                            </strong>
                                          </div>
                                        </div>
                                        {vendor.pickup_address[0]?.address_2 && (
                                          <>
                                            <hr />
                                            <div className='d-flex justify-content-between'>
                                              <div> Address Line 2 </div>
                                              <div>
                                                <strong>
                                                  {
                                                    vendor.pickup_address[0]?.address_2
                                                  }
                                                </strong>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        <hr />
                                        <div className='d-flex justify-content-between'>
                                          <div> City </div>
                                          <div>
                                            <strong>
                                              {vendor.pickup_address[0]?.city || 'N/A'}
                                            </strong>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-between'>
                                          <div> State </div>
                                          <div>
                                            <strong>
                                              {vendor.pickup_address[0]?.state || 'N/A'}
                                            </strong>
                                          </div>
                                        </div>
                                        {vendor.pickup_address[0]?.landmark && (
                                          <>
                                            <hr />
                                            <div className='d-flex justify-content-between'>
                                              <div> Landmark </div>
                                              <div>
                                                <strong>
                                                  {
                                                    vendor.pickup_address[0]?.landmark
                                                  }
                                                </strong>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        <hr />
                                        <div className='d-flex justify-content-between'>
                                          <div> Pin </div>
                                          <div>
                                            <strong>
                                              {vendor.pickup_address[0]?.pin || 'N/A'}
                                            </strong>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                </div>
                              );
                            })
                          ) : (
                            // Fallback for old single vendor structure
                            <>
                              <div className='d-flex justify-content-between'>
                                <div> Store Name </div>
                                <div>
                                  <strong>
                                    {order?.vendor?.vendor?.store_name ||
                                      order?.vendor?.store_name ||
                                      order?.vendor?.name ||
                                      'N/A'}
                                  </strong>
                                </div>
                              </div>
                              <hr />
                              <div className='d-flex justify-content-between'>
                                <div> Phone </div>
                                <div>
                                  <strong>
                                    {order.vendor && order.vendor.phone}
                                  </strong>
                                </div>
                              </div>
                              <hr />
                              <div className='d-flex justify-content-between'>
                                <div> Email </div>
                                <div>
                                  <strong>
                                    {order.vendor && order.vendor.email}
                                  </strong>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='card'>
                        <div className='card-header bg-light'>
                          <h4 className='card-title mb-0'>
                            <i className='fa fa-map-marker mr-2'></i>Delivery
                            Address
                          </h4>
                        </div>
                        <div className='card-body'>
                          <div className='font-weight-bold'>
                            {order.shipping_address?.address_1 ||
                              order.address?.address_1}
                          </div>
                          {(order.shipping_address?.address_2 ||
                            order.address?.address_2) && (
                            <div>
                              {order.shipping_address?.address_2 ||
                                order.address?.address_2}
                            </div>
                          )}
                          {(order.shipping_address?.landmark ||
                            order.address?.landmark) && (
                            <div className='text-muted small'>
                              Landmark:{' '}
                              {order.shipping_address?.landmark ||
                                order.address?.landmark}
                            </div>
                          )}
                          <div className='mt-2'>
                            {order.shipping_address?.city ||
                              order.address?.city}
                            ,{' '}
                            {order.shipping_address?.state ||
                              order.address?.state}{' '}
                            -{' '}
                            {order.shipping_address?.pin || order.address?.pin}
                          </div>
                        </div>
                      </div>
                      <div className='card'>
                        <div className='card-header bg-light'>
                          <h4 className='card-title mb-0'>
                            <i className='fa fa-file-text mr-2'></i>Billing
                            Address
                          </h4>
                        </div>
                        <div className='card-body'>
                          <div className='font-weight-bold'>
                            {order.billing_address?.address_1 ||
                              order.address?.address_1}
                          </div>
                          {(order.billing_address?.address_2 ||
                            order.address?.address_2) && (
                            <div>
                              {order.billing_address?.address_2 ||
                                order.address?.address_2}
                            </div>
                          )}
                          {(order.billing_address?.landmark ||
                            order.address?.landmark) && (
                            <div className='text-muted small'>
                              Landmark:{' '}
                              {order.billing_address?.landmark ||
                                order.address?.landmark}
                            </div>
                          )}
                          <div className='mt-2'>
                            {order.billing_address?.city || order.address?.city}
                            ,{' '}
                            {order.billing_address?.state ||
                              order.address?.state}{' '}
                            - {order.billing_address?.pin || order.address?.pin}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <OrderUpdateCard
                    order={order}
                    reloadData={reloadData}
                    user={user}
                  />
                  <OrderDispatch order={order} reloadData={reloadData} />

                  <div className='card'>
                    <div className='card-header'>
                      <h4 className='card-title'> Order Summary </h4>
                    </div>
                    <div className='card-body'>
                      <div className='d-flex justify-content-between mb-2'>
                        <div className='text-muted'>Order Date</div>
                        <div className='font-weight-bold'>
                          {moment(order.order_date).format('DD-MMM-YYYY')}
                        </div>
                      </div>
                      <hr />
                      <div className='d-flex justify-content-between mb-2'>
                        <div>Sub Total</div>
                        <div>
                          ₹{order.sub_total?.toLocaleString('en-IN') || 0}
                        </div>
                      </div>
                      <div className='d-flex justify-content-between mb-2'>
                        <div>Tax (GST)</div>
                        <div>₹{order.tax?.toLocaleString('en-IN') || 0}</div>
                      </div>
                      {order.delivery_charges > 0 && (
                        <div className='d-flex justify-content-between mb-2'>
                          <div>Delivery Charges</div>
                          <div>
                            ₹{order.delivery_charges?.toLocaleString('en-IN')}
                          </div>
                        </div>
                      )}
                      {order.discount > 0 && (
                        <div className='d-flex justify-content-between mb-2 text-success'>
                          <div>Discount</div>
                          <div>-₹{order.discount?.toLocaleString('en-IN')}</div>
                        </div>
                      )}
                      <hr />
                      <div className='d-flex justify-content-between'>
                        <div className='font-weight-bold'>Total Amount</div>
                        <div
                          className='font-weight-bold text-primary'
                          style={{ fontSize: '1.2rem' }}
                        >
                          ₹{order.total_amount?.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Vendor Commissions Section */}
                  {user && user.role === 'SUPER ADMIN' && order.vendor_commissions && order.vendor_commissions.length > 0 && (
                    <div className='card border-primary'>
                      <div className='card-header bg-primary text-white'>
                        <h4 className='card-title text-white'>
                          Vendor Commissions & Payouts
                        </h4>
                      </div>
                      <div className='card-body p-0'>
                        <table className='table table-striped mb-0' style={{ fontSize: '13px' }}>
                          <thead>
                            <tr>
                              <th>Store</th>
                              <th>Sales</th>
                              <th>Comm</th>
                              <th>Net Payout</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.vendor_commissions.map((vc, idx) => {
                              const sales = vc.total_amount || 0;
                              const comm = vc.commission_amount || 0;
                              const tax = comm * 0.18;
                              const netPayout = sales - comm - tax;
                              return (
                                <tr key={vc._id || idx}>
                                  <td><strong>{vc.store_name || vc.vendor_name || 'N/A'}</strong></td>
                                  <td>₹{sales.toLocaleString('en-IN')}</td>
                                  <td>
                                    ₹{comm.toLocaleString('en-IN')}
                                    <div className='text-muted' style={{ fontSize: '11px' }}>
                                      ({vc.commission_rate}% + 18% GST)
                                    </div>
                                  </td>
                                  <td className='text-success font-weight-bold'>
                                    ₹{netPayout.toLocaleString('en-IN')}
                                  </td>
                                  <td>
                                    <span className={`badge ${vc.payment_status === 'PAID' ? 'badge-success bg-success' : 'badge-warning bg-warning'}`}>
                                      {vc.payment_status || 'PENDING'}
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      className={`btn btn-xs ${vc.payment_status === 'PAID' ? 'btn-danger' : 'btn-success'}`}
                                      onClick={() => handlePayoutStatusToggle(vc.vendor?._id || vc.vendor, vc.payment_status !== 'PAID')}
                                    >
                                      {vc.payment_status === 'PAID' ? 'Unpay' : 'Pay'}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Vendor Specific Commission Section */}
                  {user && user.role === 'VENDOR' && order.vendor_commissions && order.vendor_commissions.length > 0 && (() => {
                    const myComm = order.vendor_commissions.find(
                      (vc) => (vc.vendor?._id || vc.vendor) === user._id
                    );
                    if (!myComm) return null;
                    const sales = myComm.total_amount || 0;
                    const comm = myComm.commission_amount || 0;
                    const tax = comm * 0.18;
                    const netPayout = sales - comm - tax;
                    return (
                      <div className='card border-primary'>
                        <div className='card-header bg-primary text-white'>
                          <h4 className='card-title text-white'>
                            My Commission & Payout
                          </h4>
                        </div>
                        <div className='card-body'>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>Store Name</div>
                            <div className='font-weight-bold'>{myComm.store_name || 'N/A'}</div>
                          </div>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>My Total Sales</div>
                            <div className='font-weight-bold'>₹{sales.toLocaleString('en-IN')}</div>
                          </div>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>Commission Rate</div>
                            <div className='font-weight-bold'>{myComm.commission_rate}%</div>
                          </div>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>Commission Deducted</div>
                            <div className='font-weight-bold text-danger'>-₹{comm.toLocaleString('en-IN')}</div>
                          </div>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>GST (18% on Comm)</div>
                            <div className='font-weight-bold text-danger'>-₹{tax.toLocaleString('en-IN')}</div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between mb-2'>
                            <div className='font-weight-bold'>My Net Earnings</div>
                            <div className='font-weight-bold text-success' style={{ fontSize: '1.1rem' }}>
                              ₹{netPayout.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div className='mt-3 d-flex justify-content-between align-items-center'>
                            <div>Payout Status:</div>
                            <span className={`badge ${myComm.payment_status === 'PAID' ? 'badge-success bg-success' : 'badge-warning bg-warning'}`} style={{ fontSize: '13px', padding: '6px 12px' }}>
                              {myComm.payment_status || 'PENDING'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Legacy single vendor Commission Summary (for Super Admin only, as fallback) */}
                  {user && user.role === 'SUPER ADMIN' && order.commission && (!order.vendor_commissions || order.vendor_commissions.length === 0) && (() => {
                    const commRate = order.commission.commission_percentage || 10;
                    const subTotal = order.sub_total || order.total_amount || 0;
                    const commAmt = order.commission.commission_amount || (subTotal * (commRate / 100));
                    const tax = order.commission.tax || (commAmt * 0.18);
                    const netPayout = Math.max(0, subTotal - commAmt - tax);

                    return (
                      <div className='card border-primary'>
                        <div className='card-header bg-primary text-white'>
                          <h4 className='card-title text-white'>
                            Commission Summary (Legacy)
                          </h4>
                        </div>
                        <div className='card-body'>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>Rate (%)</div>
                            <div className='font-weight-bold'>
                              {commRate}%
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>Commission Amount</div>
                            <div className='font-weight-bold'>
                              ₹{commAmt.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div className='d-flex justify-content-between mb-2'>
                            <div>Tax (18%)</div>
                            <div>
                              ₹{tax.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between mb-2'>
                            <div className='font-weight-bold'>Net Vendor Payout</div>
                            <div className='font-weight-bold text-success' style={{ fontSize: '1.1rem' }}>
                              ₹{netPayout.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div className='mt-3 d-flex justify-content-between align-items-center'>
                            <span
                              className={`badge ${
                                order.commission.is_paid
                                  ? 'badge-success bg-success'
                                  : 'badge-warning bg-warning'
                              }`}
                              style={{ fontSize: '13px', padding: '6px 12px' }}
                            >
                              {order.commission.is_paid ? 'PAID' : 'UNPAID'}
                            </span>
                            <button
                              className={`btn btn-xs ${order.commission.is_paid ? 'btn-danger' : 'btn-success'}`}
                              onClick={() => handlePayoutStatusToggle(order.vendor?._id || order.vendor, !order.commission.is_paid)}
                            >
                              {order.commission.is_paid ? 'Mark Unpaid' : 'Mark Paid'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Legacy single vendor Commission Summary (for VENDOR only, as fallback) */}
                  {user && user.role === 'VENDOR' && order.commission && (!order.vendor_commissions || order.vendor_commissions.length === 0) && (order.vendor?._id === user._id || order.vendor === user._id) && (
                    <div className='card border-primary'>
                      <div className='card-header bg-primary text-white'>
                        <h4 className='card-title text-white'>
                          My Commission & Payout (Legacy)
                        </h4>
                      </div>
                      <div className='card-body'>
                        <div className='d-flex justify-content-between mb-2'>
                          <div>My Total Sales</div>
                          <div className='font-weight-bold'>₹{(order.sub_total || order.total_amount || 0).toLocaleString('en-IN')}</div>
                        </div>
                        <div className='d-flex justify-content-between mb-2'>
                          <div>Commission Rate</div>
                          <div className='font-weight-bold'>{order.commission.commission_percentage}%</div>
                        </div>
                        <div className='d-flex justify-content-between mb-2'>
                          <div>Commission Deducted</div>
                          <div className='font-weight-bold text-danger'>-₹{order.commission.commission_amount?.toLocaleString('en-IN')}</div>
                        </div>
                        <div className='d-flex justify-content-between mb-2'>
                          <div>GST (18% on Comm)</div>
                          <div className='font-weight-bold text-danger'>-₹{(order.commission.tax || (order.commission.commission_amount * 0.18))?.toLocaleString('en-IN')}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between mb-2'>
                          <div className='font-weight-bold'>My Net Earnings</div>
                          <div className='font-weight-bold text-success' style={{ fontSize: '1.1rem' }}>
                            ₹{((order.sub_total || order.total_amount || 0) - order.commission.commission_amount - (order.commission.tax || (order.commission.commission_amount * 0.18))).toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className='mt-3 d-flex justify-content-between align-items-center'>
                          <div>Payout Status:</div>
                          <span className={`badge ${order.commission.is_paid ? 'badge-success bg-success' : 'badge-warning bg-warning'}`} style={{ fontSize: '13px', padding: '6px 12px' }}>
                            {order.commission.is_paid ? 'PAID' : 'PENDING'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* {order.shipping_details && (
                    <div className='card'>
                      <div className='card-header'>
                        <h4 className='card-title'> Shipment Tracking </h4>
                      </div>
                      <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                          <div> Shipping Order ID </div>
                          <div>
                            <strong>{order.shipping_details.order_id}</strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> AWB </div>
                          <div>
                            <strong>{order.shipping_details.awb}</strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> Current Status </div>
                          <div>
                            <strong>
                              {order.shipping_details.current_status}
                            </strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> Shipment Status </div>
                          <div>
                            <strong>
                              {order.shipping_details.shipment_status}
                            </strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> Courier Name </div>
                          <div>
                            <strong>
                              {order.shipping_details.courier_name}
                            </strong>
                          </div>
                        </div>
                        <hr />
                        <h4 className='card-title'> Order Tracking </h4>
                        {order.shipping_details.scans &&
                          order.shipping_details.scans.map((item, index) => {
                            return (
                              <div>
                                <div className='d-flex justify-content-between'>
                                  <div> Date </div>
                                  <div>
                                    <strong>{item.date}</strong>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                  <div> Activity </div>
                                  <div>
                                    <strong>{item.activity}</strong>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                  <div> Location </div>
                                  <div>
                                    <strong>{item.location}</strong>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )} */}
                  <div className='card'>
                    <div className='card-body'>
                      <Link
                        to={`/orders/${order._id}/track`}
                        className='btn btn-success'
                      >
                        {' '}
                        Track Order{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
