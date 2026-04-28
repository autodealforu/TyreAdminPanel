import React from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import FilterDateComponent from '../../components/common/FilterDateComponent';
import { useAllDashboards } from '../../shared/hooks/UseDashboard';
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
                                {item.notes &&  <div dangerouslySetInnerHTML={{ __html: (item.notes) }} />}
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
