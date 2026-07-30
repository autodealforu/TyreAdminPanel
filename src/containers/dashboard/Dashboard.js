import React from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import FilterDateComponent from '../../components/common/FilterDateComponent';
import { useAllDashboards } from '../../shared/hooks/UseDashboard';
import { useSettleVendorPayout } from '../../shared/hooks/UseOrder';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelectAllNotification } from '../../shared/hooks/UseNotification';
// import renderHTML from 'react-render-html';
import DoughnutChart from '../../components/charts/DonughtChart';
import { useLoggedInUser } from '../../shared/hooks/UseAuth';
function Dashboard() {
  const [data] = useAllDashboards();
  const [loggedInUser] = useLoggedInUser();
  const { user } = loggedInUser;
  const { dashboards, dashboards_loading } = data;
  const [notification_data] = useSelectAllNotification();
  const { all_notifications } = notification_data;
  const [settlePayout] = useSettleVendorPayout();

  const handleBulkSettle = async (vendorId, storeName) => {
    if (window.confirm(`Are you sure you want to mark ALL pending payouts for "${storeName || 'this vendor'}" as PAID?`)) {
      await settlePayout(vendorId);
      window.location.reload();
    }
  };
  console.log(dashboards);
  return (
    <div className='pace-done'>
      <Header />
      <div className='content-wrapper'>
        <FilterDateComponent link='/dashboard' />
      </div>
      {user && (
        <>
          {(user.role === 'SUPER ADMIN' || user.role === 'VENDOR') && (
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='dashboard-add-btn'>
                        <Link to='/products/add'>
                          <button className='btn btn-dark'>
                            <i className='fa fa-plus' /> Add Your Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-9'>
                {!dashboards_loading ? (
                  dashboards && (
                    <>
                      <div className='row'>
                        {(user.role === 'SUPER ADMIN' ||
                          user.role === 'VENDOR') && (
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending'>
                                <Link to={`/products`}>
                                  <div className='report-title'>
                                    My Total Products{' '}
                                  </div>
                                </Link>
                                <Link to={`/products`}>
                                  <div className='report-stat'>
                                    {' '}
                                    {dashboards.total_products}{' '}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          )}
                        {dashboards.product_status_array &&
                          dashboards.product_status_array.map((item) => {
                            return (
                              <div className='col-md-3'>
                                <div className='dashboard-stat pending'>
                                  <Link
                                    to={
                                      user.role === 'SUPER ADMIN' ||
                                        user.role === 'VENDOR'
                                        ? `/products?exact[product_status]=${item._id}`
                                        : '#'
                                    }
                                  >
                                    <div className='report-title'>
                                      {item._id} Products{' '}
                                    </div>
                                  </Link>
                                  <Link
                                    to={`/products?exact[product_status]=${item._id}`}
                                  >
                                    <div className='report-stat'>
                                      {' '}
                                      {item.count}{' '}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        <div className='col-md-3'>
                          <div className='dashboard-stat pending'>
                            <Link to={`/orders`}>
                              <div className='report-title'>Total Orders </div>
                            </Link>
                            <Link
                              to={
                                user.role === 'SUPER ADMIN' ||
                                  user.role === 'VENDOR'
                                  ? `/orders`
                                  : '#'
                              }
                            >
                              <div className='report-stat'>
                                {' '}
                                {dashboards.total_orders}{' '}
                              </div>
                            </Link>
                          </div>
                        </div>

                        {dashboards.order_status_array &&
                          dashboards.order_status_array.map((item) => {
                            return (
                              <div className='col-md-3'>
                                <div className='dashboard-stat pending'>
                                  <Link
                                    to={
                                      user.role === 'SUPER ADMIN' ||
                                        user.role === 'VENDOR'
                                        ? `/orders?exact[status]=${item._id}`
                                        : '#'
                                    }
                                  >
                                    <div className='report-title'>{item._id} </div>
                                  </Link>
                                  <Link
                                    to={
                                      user.role === 'SUPER ADMIN' ||
                                        user.role === 'VENDOR'
                                        ? `/orders?exact[status]=${item._id}`
                                        : '#'
                                    }
                                  >
                                    <div className='report-stat'>{item.count}</div>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        <div className='col-md-3'>
                          <div className='dashboard-stat pending'>
                            <Link
                              to={
                                user.role === 'SUPER ADMIN' ||
                                  user.role === 'VENDOR'
                                  ? `/orders`
                                  : '#'
                              }
                            >
                              <div className='report-title'>Order Amount </div>
                            </Link>
                            <Link
                              to={
                                user.role === 'SUPER ADMIN' ||
                                  user.role === 'VENDOR'
                                  ? `/orders`
                                  : '#'
                              }
                            >
                              <div className='report-stat'>
                                {' '}
                                ₹
                                {dashboards.order_total &&
                                  dashboards.order_total.length > 0
                                  ? dashboards.order_total[0] &&
                                  dashboards.order_total[0].total
                                  : 0}{' '}
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Commission and Payout stats */}
                        {dashboards.commission_stats && user.role === 'SUPER ADMIN' && (
                          <>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#eef9ff', border: '1px solid #bce1ff' }}>
                                <div className='report-title' style={{ color: '#0056b3', fontWeight: 'bold' }}>Total Commission Earned</div>
                                <div className='report-stat' style={{ color: '#0056b3' }}>
                                  ₹{dashboards.commission_stats.total_commissions?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#fff8eb', border: '1px solid #ffe6cc' }}>
                                <div className='report-title' style={{ color: '#b25e00', fontWeight: 'bold' }}>Pending Vendor Payouts</div>
                                <div className='report-stat' style={{ color: '#b25e00' }}>
                                  ₹{dashboards.commission_stats.total_payout_pending?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#edfcf1', border: '1px solid #c2f0c2' }}>
                                <div className='report-title' style={{ color: '#1b5e20', fontWeight: 'bold' }}>Completed Vendor Payouts</div>
                                <div className='report-stat' style={{ color: '#1b5e20' }}>
                                  ₹{dashboards.commission_stats.total_payout_completed?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>

                            {/* Vendor Earnings & Payout Breakdown Table for Super Admin */}
                            {dashboards.commission_stats?.vendor_payouts_list && dashboards.commission_stats.vendor_payouts_list.length > 0 && (
                              <div className='col-md-12 mt-4 mb-4'>
                                <div className='card border-primary shadow-sm'>
                                  <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center' style={{ padding: '12px 20px' }}>
                                    <h4 className='card-title text-white m-0 font-weight-bold' style={{ fontSize: '16px' }}>
                                      <i className='fa fa-briefcase mr-2'></i> Vendor Earnings & Payouts Breakdown
                                    </h4>
                                  </div>
                                  <div className='card-body p-0'>
                                    <div className='table-responsive'>
                                      <table className='table table-striped table-hover mb-0 align-middle' style={{ fontSize: '14px' }}>
                                        <thead className='thead-dark'>
                                          <tr>
                                            <th style={{ padding: '12px 15px' }}>#</th>
                                            <th style={{ padding: '12px 15px' }}>Store / Vendor Name</th>
                                            <th style={{ padding: '12px 15px' }}>Total Orders</th>
                                            <th style={{ padding: '12px 15px' }}>Total Sales</th>
                                            <th style={{ padding: '12px 15px' }}>AutoDeal4U Comm (10%)</th>
                                            <th style={{ padding: '12px 15px' }}>Pending Vendor Payout</th>
                                            <th style={{ padding: '12px 15px' }}>Paid Payout</th>
                                            <th style={{ padding: '12px 15px' }}>Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {dashboards.commission_stats.vendor_payouts_list.map((v, idx) => (
                                            <tr key={v.vendor_id || idx}>
                                              <td style={{ padding: '12px 15px' }}>{idx + 1}</td>
                                              <td style={{ padding: '12px 15px' }}>
                                                <strong className='text-dark'>{v.store_name || 'Vendor Store'}</strong>
                                              </td>
                                              <td style={{ padding: '12px 15px' }}>
                                                <span className='text-dark' style={{ fontSize: '12px', padding: '5px 10px' }}>{v.orders_count} orders</span>
                                              </td>
                                              <td style={{ padding: '12px 15px', fontWeight: '600' }}>₹{v.total_sales?.toLocaleString('en-IN')}</td>
                                              <td style={{ padding: '12px 15px', color: '#0056b3', fontWeight: 'bold' }}>
                                                ₹{v.total_commission?.toLocaleString('en-IN')}
                                              </td>
                                              <td style={{ padding: '12px 15px', color: '#b25e00', fontWeight: 'bold' }}>
                                                ₹{v.pending_payout?.toLocaleString('en-IN')}
                                              </td>
                                              <td style={{ padding: '12px 15px', color: '#1b5e20', fontWeight: 'bold' }}>
                                                ₹{v.completed_payout?.toLocaleString('en-IN')}
                                              </td>
                                              <td style={{ padding: '12px 15px' }}>
                                                {v.vendor_id && v.vendor_id !== 'general' ? (
                                                  <div className='d-flex align-items-center' style={{ gap: '8px' }}>
                                                    {v.pending_payout > 0 && (
                                                      <button
                                                        className='btn btn-sm btn-success'
                                                        style={{ padding: '3px 10px', fontSize: '12px', fontWeight: 'bold' }}
                                                        onClick={() => handleBulkSettle(v.vendor_id, v.store_name)}
                                                      >
                                                        Settle All Payouts
                                                      </button>
                                                    )}
                                                    <Link
                                                      to={`/vendors/${v.vendor_id}/view`}
                                                      className='btn btn-sm btn-outline-primary'
                                                      style={{ padding: '3px 10px', fontSize: '12px' }}
                                                    >
                                                      View Vendor
                                                    </Link>
                                                  </div>
                                                ) : (
                                                  <span className='text-muted small'>-</span>
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {dashboards.commission_stats && user.role === 'VENDOR' && (
                          <>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#eef9ff', border: '1px solid #bce1ff' }}>
                                <div className='report-title' style={{ color: '#0056b3', fontWeight: 'bold' }}>My Total Sales</div>
                                <div className='report-stat' style={{ color: '#0056b3' }}>
                                  ₹{dashboards.commission_stats.vendor_sales?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#fff1f0', border: '1px solid #ffd8d6' }}>
                                <div className='report-title' style={{ color: '#c53929', fontWeight: 'bold' }}>Commission Deducted</div>
                                <div className='report-stat' style={{ color: '#c53929' }}>
                                  ₹{dashboards.commission_stats.vendor_commission?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#edfcf1', border: '1px solid #c2f0c2' }}>
                                <div className='report-title' style={{ color: '#1b5e20', fontWeight: 'bold' }}>My Net Earnings</div>
                                <div className='report-stat' style={{ color: '#1b5e20' }}>
                                  ₹{dashboards.commission_stats.vendor_net_earnings?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#fff8eb', border: '1px solid #ffe6cc' }}>
                                <div className='report-title' style={{ color: '#b25e00', fontWeight: 'bold' }}>Payouts Pending</div>
                                <div className='report-stat' style={{ color: '#b25e00' }}>
                                  ₹{dashboards.commission_stats.vendor_payout_pending?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='dashboard-stat pending' style={{ backgroundColor: '#edfcf1', border: '1px solid #c2f0c2' }}>
                                <div className='report-title' style={{ color: '#1b5e20', fontWeight: 'bold' }}>Payouts Completed</div>
                                <div className='report-stat' style={{ color: '#1b5e20' }}>
                                  ₹{dashboards.commission_stats.vendor_payout_completed?.toLocaleString('en-IN') || 0}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {dashboards.order_total_stats &&
                          dashboards.order_total_stats.map((item) => {
                            return (
                              <div className='col-md-3'>
                                <div className='dashboard-stat pending'>
                                  <Link
                                    to={
                                      user.role === 'SUPER ADMIN' ||
                                        user.role === 'VENDOR'
                                        ? `/orders?exact[status]=${item._id}`
                                        : '#'
                                    }
                                  >
                                    <div className='report-title'>{item._id} </div>
                                  </Link>
                                  <Link
                                    to={
                                      user.role === 'SUPER ADMIN' ||
                                        user.role === 'VENDOR'
                                        ? `/orders?exact[status]=${item._id}`
                                        : '#'
                                    }
                                  >
                                    <div className='report-stat'>
                                      {' '}
                                      ₹{item.total}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {(user.role === 'SUPER ADMIN' ||
                        user.role === 'VENDOR') && (
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='card'>
                                <div className='card-header'>
                                  {' '}
                                  State Wise Orders{' '}
                                </div>
                                <div className='card-body'>
                                  <DoughnutChart
                                    graph_data={
                                      dashboards &&
                                      dashboards.order_total_states_count
                                    }
                                    label={'_id'}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='card'>
                                <div className='card-header'>
                                  {' '}
                                  State Wise Order Amount{' '}
                                </div>
                                <div className='card-body'>
                                  <DoughnutChart
                                    graph_data={
                                      dashboards && dashboards.order_total_states
                                    }
                                    label={'_id'}
                                    value={'total'}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {(user.role === 'SUPER ADMIN' ||
                        user.role === 'VENDOR') && (
                          <div className='row'>
                            <div className='col-md-12'>
                              <div className='card'>
                                <div className='card-body'>
                                  <table className='table table-striped'>
                                    <thead>
                                      <tr>
                                        <th>#Order No</th>
                                        <th> Order Date </th>
                                        <th> Order Amount </th>
                                        <th> Order Status </th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {dashboards.orders &&
                                        dashboards.orders.map((item) => {
                                          return (
                                            <tr>
                                              <td>{item.order_id}</td>
                                              <td>
                                                {' '}
                                                {moment(item.order_date).format(
                                                  'DD-MMM-YYYY'
                                                )}{' '}
                                              </td>
                                              <td> {item.total_amount} </td>
                                              <td> {item.status} </td>
                                              <td>
                                                {' '}
                                                <Link
                                                  to={`/orders/${item._id}/view`}
                                                >
                                                  {' '}
                                                  <i className='fa fa-eye'></i>{' '}
                                                </Link>{' '}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </>
                  )
                ) : (
                  <div></div>
                )}
              </div>
              {(user.role === 'SUPER ADMIN' || user.role === 'VENDOR') && (
                <div className='col-md-3'>
                  <div className='card'>
                    <div className='card-header'>
                      <h4 className='card-title'> Notification </h4>
                    </div>
                    <div className='card-body'>
                      {all_notifications &&
                        all_notifications.notifications &&
                        all_notifications.notifications.map((item) => {
                          return (
                            <div className='notification-area'>
                              <Link
                                to={`/orders/${item.order}/view?notification=${item._id}`}
                              >
                                {item.notes && <div dangerouslySetInnerHTML={{ __html: (item.notes) }} />}
                              </Link>

                              <div className='dropdown-divider' />
                            </div>
                          );
                        })}
                      {all_notifications &&
                        all_notifications.notifications &&
                        all_notifications.notifications.length == 0 && (
                          <p> No New Order </p>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
