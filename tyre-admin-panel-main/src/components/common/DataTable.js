import React, { useState } from 'react';
import { LIMIT, URI } from '../../domain/constant';
import TableDeleteBtn from './TableDeleteBtn';
import TableEditBtn from './TableEditBtn';
import TableViewBtn from './TableViewBtn';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import ReactModal from 'react-modal';

import SingleView from '../../components/common/SingleView';
// import { useSingleClient } from "../../shared/hooks/UseClient";
import Header from '../template/Header';
import BreadCrumb from '../template/BreadCrumb';

function DataTable({
  loading,
  data,
  page,
  keys,
  deleteBtnClicked,
  field,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  style,
  hideQVBtn,
  hideDeleteBtn,
  hideEditBtn,
  hideViewBtn,
}) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const customStyles = {
    content: {
      zIndex: 9999999,
    },
  };

  // const { client } = data;

  return (
    <div>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='table-responsive'>
            <table className='table align-middle  table-striped ' style={style}>
              <thead>
                <tr className='bg-transparent' role='row'>
                  <th>#</th>
                  {keys &&
                    keys.map((item) => {
                      return <th> {item.name} </th>;
                    })}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  data &&
                  data.map((single, index) => {
                    return (
                      <tr key={`single-${index}`}>
                        <td className='sorting_1'>
                          {index + 1 + (page - 1) * LIMIT}
                        </td>
                        {keys &&
                          keys.map((item) => {
                            if (item.image) {
                              return (
                                <td>
                                  {single[item.value] ? (
                                    <img
                                      src={`${URI}${single[item.value]}`}
                                      style={{
                                        height: '50px',
                                        width: '50px',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  ) : (
                                    '-'
                                  )}
                                </td>
                              );
                            }
                            if (item.date) {
                              return (
                                <td>
                                  {moment(single[item.value]).format(
                                    'DD-MM-YYYY'
                                  )}
                                </td>
                              );
                            }
                            if (item.boolean) {
                              return (
                                <td>
                                  {single[item.value] ? (
                                    <div className='badge bg-success'>YES</div>
                                  ) : (
                                    <div className='badge bg-danger'> NO</div>
                                  )}
                                </td>
                              );
                            }
                            if (item.link) {
                              return (
                                <td>
                                  <a
                                    target='_blank'
                                    href={`${item.url}${single[item.field]}`}
                                  >
                                    {item.label}
                                  </a>
                                </td>
                              );
                            }
                            if (item.related && item.field) {
                              return (
                                <td>
                                  {single[item.value] &&
                                    single[item.value][item.field]}
                                </td>
                              );
                            }

                            return (
                              <td>
                                {' '}
                                {item.preFilled ? item.preFilled : ''}{' '}
                                {single[item.value]}
                                {item.postFilled ? item.postFilled : ''}{' '}
                              </td>
                            );
                          })}
                        <td>
                          {!hideQVBtn && (
                            <button
                              className='btn btn-soft-light'
                              onClick={() => {
                                setModal(true);
                                setModalData(single);
                              }}
                            >
                              {' '}
                              <i className='fa fa-binoculars'></i>{' '}
                            </button>
                          )}
                          {!hideViewBtn && (
                            <TableViewBtn id={single._id} item={field} />
                          )}
                          {!hideEditBtn && (
                            <TableEditBtn id={single._id} item={field} />
                          )}
                          {!hideDeleteBtn && (
                            <TableDeleteBtn
                              id={single._id}
                              deleteBtnClicked={deleteBtnClicked}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={20} className='text-center'>
                      <Spinner />
                    </td>
                  </tr>
                )}
                {data && data.length === 0 && (
                  <tr>
                    <td colSpan={20}>No result found</td>
                  </tr>
                )}
              </tbody>
            </table>
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
            <div className='title'> {PAGE_SINGLE_TITLE} </div>
            <div>
              <button
                onClick={() => {
                  setModal(false);
                }}
                className='btn btn-primary'
              >
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>
          {modalData && (
            <div className='qv-body'>
              <SingleView
                data={modalData}
                inputFields={inputFields}
                label={PAGE_SINGLE_TITLE}
                link={field}
                id={modalData._id}
                hideAllBtn={true}
                col={12}
              />
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
export default DataTable;
