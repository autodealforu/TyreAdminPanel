import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { LIMIT, URI } from '../../domain/constant';
import Pagination from '../../components/common/Pagination';
import AddBtn from '../../components/common/AddBtn';
import {
  view_all_table,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
  inputFields,
} from '../../shared/enums/orders_enum';
import DataTable from '../../components/common/DataTable';
import {
  useAllOrders,
  useGetDropdownOptions,
} from '../../shared/hooks/UseOrder';
import SidebarFilter from '../../components/common/SidebarFilter';
import ExportComponent from '../../components/common/ExportComponent';
import { UseDataForExcel, UseFilter } from '../../shared/hooks/UseExcel';
import TableDeleteBtn from '../../components/common/TableDeleteBtn';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import FilterDateComponent from '../../components/common/FilterDateComponent';
import { useLoggedInUser } from '../../shared/hooks/UseAuth';

const AllOrders = ({}) => {
  const [data, setPageNumber, deleteBtnClicked] = useAllOrders();
  const { orders_loading, orders, total_orders, page, pages } = data;
  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

  const [exportXLSXData] = UseFilter();

  const [convertToReadable, exportData] = UseDataForExcel();

  const [user_data] = useLoggedInUser();
  const { user } = user_data;

  useEffect(() => {
    if (orders) {
      convertToReadable(orders, inputFields);
    }
  }, [orders]);

  const handleOnExport = () => {
    exportXLSXData(exportData, 'Orders', 'orders');
  };
  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_TITLE}
          mainLinkTitle='Dashboard'
          mainLinkUrl=''
          activeLink={PAGE_TITLE}
        />
        <ExportComponent handleOnExport={handleOnExport} />
        <FilterDateComponent link='/orders' />

        <div className='container-fluid'>
          <div className='row'>
            {SIDEBAR_OPTIONS && (
              <SidebarFilter
                SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
                dropdown_options={dropdownOptions}
                loadOptions={loadOptions}
              />
            )}
            <div className='col-lg-10'>
              <div
                className='card'
                style={{ boxShadow: 'rgb(227 233 243) 0px 4px 22px' }}
              >
                <div className='card-body'>
                  {/* <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} /> */}
                  {total_orders} records found
                  <div>
                    <div className='table-responsive'>
                      <table className='table align-middle  table-striped '>
                        <thead>
                          <tr className='bg-transparent' role='row'>
                            <th>#</th>
                            <th> Order ID </th>
                            <th> Order Date </th>
                            <th> Is Paid </th>
                            <th> Payment Method </th>
                            <th> Total Amount </th>
                            <th> Customer </th>
                            {user && user.role === 'SUPER ADMIN' && (
                              <th> Phones </th>
                            )}
                            {user && user.role === 'SUPER ADMIN' && (
                              <th> Vendor </th>
                            )}
                            <th> Website </th>
                            <th> Status </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders &&
                            orders.map((item, index) => {
                              return (
                                <tr>
                                  <td className='sorting_1'>
                                    {index + 1 + (page - 1) * LIMIT}
                                  </td>
                                  <td> {item.order_id} </td>
                                  <td>
                                    {item.order_date &&
                                      moment(item.order_date).format(
                                        'DD-MM-YYYY'
                                      )}
                                    <br />
                                    {item.order_date &&
                                      moment(item.order_date).format(
                                        'hh:mm:ss'
                                      )}
                                  </td>
                                  <td>
                                    {item.is_paid ? (
                                      <div className='badge bg-success'>
                                        Yes
                                      </div>
                                    ) : (
                                      <div className='badge bg-danger'> NO</div>
                                    )}
                                  </td>
                                  <td> {item.payment_method} </td>
                                  <td> ₹ {item.total_amount} </td>
                                  <td>{item.customer && item.customer.name}</td>
                                  {user && user.role === 'SUPER ADMIN' && (
                                    <td>
                                      {item.customer && item.customer.phone}
                                    </td>
                                  )}
                                  {user && user.role === 'SUPER ADMIN' && (
                                    <td>
                                      {' '}
                                      {item.vendor && (
                                        <Link
                                          to={`/vendors/${item.vendor._id}/view`}
                                        >
                                          #{item.vendor.user_id} -
                                          {item.vendor &&
                                            (item.vendor.vendor &&
                                            item.vendor.vendor.store_name
                                              ? item.vendor.vendor.store_name
                                              : item.vendor.name)}{' '}
                                        </Link>
                                      )}
                                    </td>
                                  )}
                                  <td>
                                    <a
                                      className='btn btn-soft-light'
                                      target='_blank'
                                      href={`https://pickkro.com/product/${item.products[0].slug}`}
                                    >
                                      <i className='fa fa-location-arrow' />
                                    </a>
                                  </td>
                                  <td> {item.status} </td>
                                  <td>
                                    <a
                                      className='btn btn-soft-light'
                                      href={`/orders/${item._id}/view`}
                                    >
                                      <i className='fa fa-eye' />
                                    </a>
                                    {user && user.role === 'SUPER ADMIN' && (
                                      <TableDeleteBtn
                                        id={item._id}
                                        deleteBtnClicked={deleteBtnClicked}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>

                    <Pagination
                      data={orders}
                      page={page}
                      pages={pages}
                      count={total_orders}
                      setPage={setPageNumber}
                      loading={orders_loading}
                    />
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

export default AllOrders;
