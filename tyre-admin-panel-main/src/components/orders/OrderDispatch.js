import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import api from '../../domain/api';

export const OrderDispatch = ({ order, reloadData }) => {
  const [editing, setEditing] = useState(false);

  const updateDispatchDetails = async (formData) => {
    try {
      await api.put(`/orders/${order._id}`, {
        courier_details: formData,
      });
      reloadData(order._id);
      setEditing(false);
    } catch (error) {
      console.error('Error updating dispatch details:', error);
      alert('Failed to update dispatch details');
    }
  };

  const hasDispatchDetails =
    order?.courier_details &&
    (order.courier_details.logistics_partner ||
      order.courier_details.lr_number ||
      order.courier_details.dispatch_details);

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='d-flex justify-content-between align-items-center'>
          <h4 className='card-title mb-0'>Dispatch Information</h4>
          {hasDispatchDetails && !editing && (
            <button
              className='btn btn-sm btn-primary'
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      {hasDispatchDetails && !editing ? (
        <div className='card-body'>
          <div className='mb-3'>
            <div className='text-muted small'>Logistics Partner</div>
            <div className='font-weight-bold'>
              {order.courier_details.logistics_partner || 'N/A'}
            </div>
          </div>
          <div className='mb-3'>
            <div className='text-muted small'>LR Number</div>
            <div className='font-weight-bold'>
              {order.courier_details.lr_number || 'N/A'}
            </div>
          </div>
          <div className='mb-3'>
            <div className='text-muted small'>Dispatch Details</div>
            <div className='font-weight-bold'>
              {order.courier_details.dispatch_details || 'N/A'}
            </div>
          </div>
        </div>
      ) : (
        <div className='card-body'>
          <Formik
            initialValues={{
              logistics_partner:
                order?.courier_details?.logistics_partner || '',
              lr_number: order?.courier_details?.lr_number || '',
              dispatch_details: order?.courier_details?.dispatch_details || '',
            }}
            validationSchema={Yup.object({
              logistics_partner: Yup.string().required(
                'Logistics Partner is required'
              ),
              lr_number: Yup.string().required('LR Number is required'),
              dispatch_details: Yup.string(),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await updateDispatchDetails(values);
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form>
                <div className='form-group mb-3'>
                  <label className='font-weight-bold'>
                    Logistics Partner <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    name='logistics_partner'
                    className='form-control'
                    placeholder='Enter logistics partner name'
                    onChange={formik.handleChange}
                    value={formik.values.logistics_partner}
                  />
                  {formik.touched.logistics_partner &&
                    formik.errors.logistics_partner && (
                      <div className='text-danger small'>
                        {formik.errors.logistics_partner}
                      </div>
                    )}
                </div>

                <div className='form-group mb-3'>
                  <label className='font-weight-bold'>
                    LR Number <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    name='lr_number'
                    className='form-control'
                    placeholder='Enter LR number'
                    onChange={formik.handleChange}
                    value={formik.values.lr_number}
                  />
                  {formik.touched.lr_number && formik.errors.lr_number && (
                    <div className='text-danger small'>
                      {formik.errors.lr_number}
                    </div>
                  )}
                </div>

                <div className='form-group mb-3'>
                  <label className='font-weight-bold'>Dispatch Details</label>
                  <textarea
                    name='dispatch_details'
                    className='form-control'
                    rows='3'
                    placeholder='Enter dispatch details'
                    onChange={formik.handleChange}
                    value={formik.values.dispatch_details}
                  />
                </div>

                <div className='d-flex gap-2'>
                  <button
                    type='submit'
                    className='btn btn-success'
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                  {editing && (
                    <button
                      type='button'
                      className='btn btn-secondary'
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
