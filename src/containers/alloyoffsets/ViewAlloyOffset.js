import React from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/alloyoffsets_enum';
import { useSingleAlloyOffset } from '../../shared/hooks/UseAlloyOffset';

const ViewAlloyOffset = ({ match }) => {
  const [state] = useSingleAlloyOffset(match.params.id);
  const { alloyoffset } = state;

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`View ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={`/${LINK_URL}`}
          activeLink='View'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'> {PAGE_SINGLE_TITLE} Details</h4>
            </div>
            <div className='card-body'>
              {alloyoffset ? (
                <div className='table-responsive'>
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th style={{ width: '200px' }}>Name</th>
                        <td>{alloyoffset.name || 'N/A'}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>
                          {alloyoffset.isActive ? (
                            <span className='badge bg-success'>Active</span>
                          ) : (
                            <span className='badge bg-danger'>Inactive</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Created At</th>
                        <td>
                          {alloyoffset.createdAt
                            ? new Date(alloyoffset.createdAt).toLocaleString()
                            : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th>Updated At</th>
                        <td>
                          {alloyoffset.updatedAt
                            ? new Date(alloyoffset.updatedAt).toLocaleString()
                            : 'N/A'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAlloyOffset;
