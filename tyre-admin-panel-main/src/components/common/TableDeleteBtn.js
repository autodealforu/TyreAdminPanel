import React, { useState } from 'react';
import ReactModal from 'react-modal';
function TableDeleteBtn({ id, deleteBtnClicked }) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const customStyles = {
    content: {
      zIndex: 9999999,
    },
  };

  return (
    <>
      <button onClick={() => setModal(true)} className='btn text-danger'>
        <i className='fa fa-trash'></i>
      </button>
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
                      onClick={() => deleteBtnClicked(id)}
                    >
                      {' '}
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
    </>
  );
}

export default TableDeleteBtn;
