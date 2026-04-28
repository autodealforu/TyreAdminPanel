import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as qs from 'qs';
import AddBtn from '../../components/common/AddBtn';
import ExportComponent from '../../components/common/ExportComponent';
import Pagination from '../../components/common/Pagination';
import SimpleFilter from '../../components/common/SimpleFilter';
import TableDeleteBtn from '../../components/common/TableDeleteBtn';
import TableEditBtn from '../../components/common/TableEditBtn';
import TableViewBtn from '../../components/common/TableViewBtn';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import {
  LINK_URL,
  PAGE_SINGLE_TITLE,
  PAGE_TITLE,
  view_all_table,
} from '../../shared/enums/products_enum';
import { UseDataForExcel, UseFilter } from '../../shared/hooks/UseExcel';
import {
  useAllUnifiedProducts,
  useDeleteUnifiedProduct,
} from '../../shared/hooks/UseUnifiedProduct';
import { useBulkDeleteProduct } from '../../shared/hooks/UseProduct';
import { URI } from '../../domain/constant';

const AllProducts = () => {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [data, getData] = useAllUnifiedProducts();
  const [handleDeleteBulkProducts] = useBulkDeleteProduct();
  const [deleteUnifiedProductFn] = useDeleteUnifiedProduct();
  const {
    unified_products: products,
    total,
    page,
    pages,
    get_unified_products_loading: get_products_loading,
  } = data;
  const [deleteEntry, setDeleteEntry] = useState(null);

  const [isChecked, setisChecked] = useState([]);

  const [exportXLSXData] = UseFilter();

  const [convertToReadable, exportData] = UseDataForExcel();

  // Define filter options for the new SimpleFilter component
  const filterOptions = [
    {
      field: 'name',
      label: 'Name',
      type: 'text',
      searchType: 'search',
    },
    {
      field: 'product_id',
      label: 'Product ID',
      type: 'text',
      searchType: 'exact',
    },
    {
      field: 'product_category',
      label: 'Product Category',
      type: 'select',
      searchType: 'exact',
      options: ['TYRE', 'ALLOY_WHEEL', 'SERVICE'],
    },
    {
      field: 'product_status',
      label: 'Product Status',
      type: 'select',
      searchType: 'exact',
      options: ['Active', 'Pending', 'Rejected'],
    },
  ];

  // Add useEffect to handle delete
  useEffect(() => {
    if (deleteEntry) {
      deleteUnifiedProductFn(deleteEntry);
      setDeleteEntry(null);
    }
  }, [deleteEntry, deleteUnifiedProductFn]);

  // Listen for URL changes and fetch data accordingly
  useEffect(() => {
    const queryParams = qs.parse(window.location.search.replace('?', ''));
    const pageNumber = queryParams.pageNumber
      ? Number(queryParams.pageNumber)
      : 1;
    getData(pageNumber, queryParams);
  }, [location.search, getData]);

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  const setPageNumber = (pageNum) => {
    // This function is passed to Pagination component but it handles URL changes internally
    // So this function might not be called directly
    console.log('setPageNumber called with:', pageNum);
  };

  useEffect(() => {
    if (products) {
      convertToReadable(products, view_all_table);
    }
    // NOTE: convertToReadable is stable for our usage; excluding it prevents an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleOnExport = () => {
    exportXLSXData(exportData, 'Products', 'products');
  };

  const handleDownloadTyreReport = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${URI}/api/products/generate-tyre-report`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate tyre report');
      }

      // Get the blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Get filename from response headers or create default
      const contentDisposition = response.headers.get('content-disposition');
      let fileName = `tyre_report_${Date.now()}.csv`;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (fileNameMatch) {
          fileName = fileNameMatch[1];
        }
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert('Tyre report downloaded successfully!');
    } catch (error) {
      console.error('Error downloading tyre report:', error);
      alert('Failed to download tyre report. Please try again.');
    }
  };

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    if (checked) {
      setisChecked([...new Set([...isChecked, value])]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };

  const handleShowModel = () => {
    if (isChecked.length !== 0) {
      setModal(true);
    } else {
      alert('please Select at least one check box !');
    }
  };

  const alldelete = async () => {
    console.log(isChecked);
    if (isChecked.length !== 0) {
      await handleDeleteBulkProducts(isChecked);
      setisChecked([]);
      setModal(false);
    } else {
      alert('please Select at least one check box !');
    }
  };

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_TITLE}
          mainLinkTitle='Dashboard'
          mainLinkUrl={LINK_URL}
          activeLink={PAGE_TITLE}
        />
        <ExportComponent handleOnExport={handleOnExport} />

        <div className='container-fluid'>
          {/* New Simple Filter Component */}
          <SimpleFilter filterOptions={filterOptions} />

          <div className='row'>
            <div className='col-lg-12'>
              <div
                className='card'
                style={{ boxShadow: 'rgb(227 233 243) 0px 4px 22px' }}
              >
                <div className='card-body'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />
                    </div>
                    <div>
                      <button
                        onClick={handleDownloadTyreReport}
                        className='btn btn-success'
                        style={{ marginRight: '10px' }}
                      >
                        <i className='fa fa-download'></i> Download Tyre Report
                      </button>
                      <Link
                        to='/products/bulk-upload-tyre-report'
                        className='btn btn-warning'
                        style={{ marginRight: '10px' }}
                      >
                        <i className='fa fa-upload'></i> Upload Tyre Report
                      </Link>
                      <Link
                        to='/products/bulk-upload'
                        className='btn btn-primary'
                        style={{ marginRight: '10px' }}
                      >
                        Bulk Import
                      </Link>
                    </div>
                  </div>
                  {total} records found
                  <button
                    className='btn btn-danger'
                    onClick={() => handleShowModel()}
                  >
                    Delete
                  </button>
                  <div className='table-responsive'>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th>
                            {/* <input
                              type='checkbox'
                            // onChange={(e) => handlecheckbox(e)}
                            /> */}
                          </th>
                          <th> # </th>
                          <th> Product Category </th>
                          <th> Product Details </th>
                          <th> Cost Price </th>
                          <th> MRP </th>
                          <th> RCP </th>
                          <th> Auto Deal </th>
                          <th> In Stock </th>
                          <th> Stock Qty </th>
                          <th> Product Status </th>
                          <th> Vendor </th>
                          <th> Published Status </th>
                          <th> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          products.map((item, product_index) => {
                            return (
                              <tr key={item._id}>
                                <td>
                                  <input
                                    type='checkbox'
                                    value={item._id}
                                    checked={isChecked.includes(item._id)}
                                    onChange={(e) => handlecheckbox(e)}
                                  />
                                </td>

                                <td> {(page - 1) * 10 + product_index + 1} </td>

                                {/* Product Category */}
                                <td>
                                  <span
                                    className={`badge ${
                                      item.product_category === 'TYRE'
                                        ? 'bg-primary'
                                        : item.product_category ===
                                          'ALLOY_WHEEL'
                                        ? 'bg-info'
                                        : 'bg-success'
                                    }`}
                                  >
                                    {item.product_category === 'TYRE' && 'Tyre'}
                                    {item.product_category === 'ALLOY_WHEEL' &&
                                      'Alloy Wheel'}
                                    {item.product_category === 'SERVICE' &&
                                      'Service'}
                                    {!item.product_category && 'Tyre'}
                                  </span>
                                </td>

                                {/* Product Details - Dynamic based on category */}
                                <td>
                                  {/* Tyre Information */}
                                  {(item.product_category === 'TYRE' ||
                                    !item.product_category) &&
                                    item.tyre && (
                                      <div>
                                        <strong>
                                          {`${
                                            item.tyre?.productBrand?.name || ''
                                          } ${
                                            item.tyre?.tyreWidth?.name || ''
                                          }${
                                            item?.tyre?.tyreWidthType ===
                                            'IN MM'
                                              ? `/${item.tyre?.aspectRatio?.name}`
                                              : ''
                                          }${item.tyre?.construction || ''}`}
                                          {item?.tyre?.rimDiameter?.name}{' '}
                                          {item?.tyre?.plyRating?.name}{' '}
                                          {item?.tyre?.loadIndex?.name}{' '}
                                          {item?.tyre?.speedSymbol?.name}{' '}
                                          {
                                            item?.tyre?.productThreadPattern
                                              ?.name
                                          }{' '}
                                          {item?.tyre?.unit}
                                        </strong>
                                      </div>
                                    )}

                                  {/* Alloy Wheel Information */}
                                  {item.product_category === 'ALLOY_WHEEL' &&
                                    item.alloy_wheel && (
                                      <div>
                                        <strong>
                                          {`${
                                            item?.alloy_wheel?.alloyBrand
                                              ?.name || 'Unknown Brand'
                                          } ${
                                            item?.alloy_wheel
                                              ?.alloyDiameterInches?.name || ''
                                          }X${
                                            item?.alloy_wheel?.alloyWidth
                                              ?.name || ''
                                          } ${
                                            item?.alloy_wheel?.alloyFinish
                                              ?.name || ''
                                          }`}
                                        </strong>
                                      </div>
                                    )}

                                  {/* Service Information */}
                                  {item.product_category === 'SERVICE' &&
                                    item.service && (
                                      <div>
                                        <strong>
                                          {item.service?.serviceName ||
                                            item.service?.serviceShortName ||
                                            'Service'}
                                        </strong>
                                        <br />
                                        <small className='text-muted'>
                                          {`${
                                            item.service?.serviceType || ''
                                          } ${
                                            item.service?.estimatedTime
                                              ? `(${item.service.estimatedTime})`
                                              : ''
                                          }`.trim()}
                                        </small>
                                      </div>
                                    )}

                                  {/* Fallback for products without specific category data */}
                                  {(item.product_category === 'TYRE' ||
                                    !item.product_category) &&
                                    !item.tyre && (
                                      <span className='text-muted'>
                                        No tyre selected
                                      </span>
                                    )}
                                  {item.product_category === 'ALLOY_WHEEL' &&
                                    !item.alloy_wheel && (
                                      <span className='text-muted'>
                                        No alloy wheel selected
                                      </span>
                                    )}
                                  {item.product_category === 'SERVICE' &&
                                    !item.service && (
                                      <span className='text-muted'>
                                        No service selected
                                      </span>
                                    )}
                                </td>

                                {/* Cost Price (unified pricing) */}
                                <td>
                                  <strong>
                                    ₹{item.cost_price || item.tyre_cost || 0}
                                  </strong>
                                </td>

                                {/* MRP */}
                                <td>
                                  ₹{item.mrp_price || item.tyre_price_mrp || 0}
                                </td>

                                {/* RCP */}
                                <td>
                                  ₹{item.rcp_price || item.tyre_price_rcp || 0}
                                </td>

                                {/* Auto Deal */}
                                <td>
                                  ₹
                                  {item.auto_deal_price ||
                                    item.tyre_price_auto_deal ||
                                    0}
                                </td>

                                {/* In Stock */}
                                <td>
                                  <label
                                    className={
                                      item.in_stock
                                        ? 'badge bg-success'
                                        : 'badge bg-danger'
                                    }
                                  >
                                    {item.in_stock ? 'YES' : 'NO'}
                                  </label>
                                </td>

                                {/* Stock Quantity */}
                                <td>
                                  <span
                                    className={`badge ${
                                      item.stock > 10
                                        ? 'bg-success'
                                        : item.stock > 0
                                        ? 'bg-warning'
                                        : 'bg-danger'
                                    }`}
                                  >
                                    {item.stock || 0}
                                  </span>
                                </td>

                                {/* Product Status */}
                                <td>
                                  <label
                                    className={
                                      item.product_status === 'Active'
                                        ? 'badge bg-success'
                                        : item.product_status === 'Pending'
                                        ? 'badge bg-warning'
                                        : 'badge bg-danger'
                                    }
                                  >
                                    {item.product_status || 'Pending'}
                                  </label>
                                </td>

                                {/* Vendor */}
                                <td>
                                  {item.vendor ? (
                                    item.vendor.vendor?.store_name ||
                                    item.vendor.name
                                  ) : (
                                    <span className='text-muted'>
                                      No vendor
                                    </span>
                                  )}
                                </td>

                                {/* Published Status */}
                                <td>
                                  <label
                                    className={
                                      item.published_status === 'PUBLISHED'
                                        ? 'badge bg-success'
                                        : 'badge bg-secondary'
                                    }
                                  >
                                    {item.published_status || 'PUBLISHED'}
                                  </label>
                                </td>

                                {/* Actions */}
                                <td>
                                  <TableViewBtn id={item._id} item={LINK_URL} />
                                  {/* <TableEditBtn id={item._id} item={LINK_URL} /> */}
                                  <TableDeleteBtn
                                    id={item._id}
                                    deleteBtnClicked={deleteBtnClicked}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        {products && products.length === 0 && (
                          <tr>
                            <td colSpan={13}>No result found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* <DataTable
                      keys={view_all_table}
                      data={products}
                      field={LINK_URL}
                      page={page}
                      deleteBtnClicked={deleteBtnClicked}
                      loading={products_loading}
                      inputFields={inputFields}
                      PAGE_TITLE={PAGE_TITLE}
                      PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                    /> */}

                    <Pagination
                      data={products}
                      page={page}
                      pages={pages}
                      count={total}
                      setPage={setPageNumber}
                      loading={get_products_loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={modal}
        contentLabel='Modal'
        className='Modal'
        overlayClassName='Overlay'
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <div className='quick-view'>
          <div className='qv-header'>
            <div className='title'> Confirm </div>
            <button
              onClick={() => {
                setModal(false);
              }}
              className='btn btn-primary'
            >
              <i className='fa fa-times'></i>
            </button>
          </div>
          <div className='qv-body'>
            <div style={{ padding: '50px 50px' }}>
              <div>
                <h3>Do You really want to delete? </h3>
                <div
                  className='d-flex justify-content-center'
                  style={{ gap: '20px' }}
                >
                  <div>
                    <button
                      className='btn btn-danger'
                      onClick={() => alldelete()}
                    >
                      YES{' '}
                    </button>
                  </div>
                  <div>
                    <button
                      className='btn btn-secondary'
                      onClick={() => setModal(false)}
                    >
                      {' '}
                      NO{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default AllProducts;
