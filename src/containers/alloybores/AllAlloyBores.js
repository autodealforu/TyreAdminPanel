import React from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import Spinner from '../../components/layout/Spinner';
import DataTable from '../../components/common/DataTable';
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  view_all_table,
} from '../../shared/enums/alloybores_enum';
import { useAllAlloyBores } from '../../shared/hooks/UseAlloyBore';

const AllAlloyBores = () => {
  const [data, setPageNumber, deleteBtnClicked] = useAllAlloyBores();
  const {
    alloybores,
    all_alloybores,
    get_alloybores_loading,
    total,
    pageNumber,
    pages,
  } = data;

  // Use the correct data field - check both possible locations
  const boreData = alloybores || all_alloybores || [];

  // console.log('AlloyBores Debug:', data); // Uncomment for debugging

  // Remove debug logs in production

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='View All'
        />
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-header'>
                <h4 className='card-title'>{PAGE_TITLE}</h4>
                <div className='card-tools'>
                  <a
                    href={`/${LINK_URL}/add`}
                    className='btn btn-primary btn-sm'
                  >
                    <i className='fas fa-plus'></i> Add {PAGE_SINGLE_TITLE}
                  </a>
                </div>
              </div>
              <div className='card-body'>
                {!get_alloybores_loading ? (
                  boreData && boreData.length > 0 ? (
                    <div className='table-responsive'>
                      <table className='table table-striped table-hover'>
                        <thead className='table-dark'>
                          <tr>
                            <th>Bore Size (MM)</th>
                            <th>Description</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {boreData
                            .filter(
                              (item) => item != null && item !== undefined
                            )
                            .map((item, index) => (
                              <tr key={item._id || index}>
                                <td>
                                  <strong>{item.name}</strong>
                                </td>
                                <td>
                                  {item.description || (
                                    <span className='text-muted'>
                                      No description
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {item.createdAt
                                    ? new Date(
                                        item.createdAt
                                      ).toLocaleDateString()
                                    : 'Unknown'}
                                </td>
                                <td>
                                  <div className='btn-group' role='group'>
                                    <a
                                      href={`/${LINK_URL}/${item._id}/view`}
                                      className='btn btn-info btn-sm'
                                      title='View Details'
                                    >
                                      <i className='fas fa-eye'></i>
                                    </a>
                                    <a
                                      href={`/${LINK_URL}/${item._id}/edit`}
                                      className='btn btn-warning btn-sm'
                                      title='Edit'
                                    >
                                      <i className='fas fa-edit'></i>
                                    </a>
                                    <button
                                      onClick={() => deleteBtnClicked(item._id)}
                                      className='btn btn-danger btn-sm'
                                      title='Delete'
                                    >
                                      <i className='fas fa-trash'></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      <div className='mt-3'>
                        <small className='text-muted'>
                          Showing {boreData.length} of{' '}
                          {total || boreData.length} alloy bore sizes
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className='text-center py-5'>
                      <div className='mb-4'>
                        <i className='fas fa-cog fa-3x text-muted'></i>
                      </div>
                      <h5>No Alloy Bores Found</h5>
                      <p className='text-muted'>
                        Start by adding common alloy bore sizes for your
                        inventory.
                      </p>
                      <a href={`/${LINK_URL}/add`} className='btn btn-primary'>
                        <i className='fas fa-plus'></i> Add First Alloy Bore
                      </a>
                    </div>
                  )
                ) : (
                  <div className='text-center py-5'>
                    <Spinner />
                    <p className='mt-3'>Loading alloy bores...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAlloyBores;
