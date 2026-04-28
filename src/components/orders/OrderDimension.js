import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import api from '../../domain/api';

export const OrderDimension = ({ order }) => {
  const updateDimensions = async (formData) => {
    const { data } = await api.post(
      `/orders/${order._id}/shipping/dimension-updates`,
      formData
    );
    window.location.reload();
  };
  return (
    <div className='card'>
      <div className='card-header'>
        <h4 className='card-title'> Order Dimensions </h4>
      </div>
      {order && order.courier_details && order.courier_details.length ? (
        <div className='card-body'>
          <div className='d-flex justify-content-between'>
            <div> Length (cm) </div>
            <div>
              <strong>{order?.courier_details?.length}</strong>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div> Width (cm) </div>
            <div>
              <strong>{order?.courier_details?.width}</strong>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div> Height (cm) </div>
            <div>
              <strong>{order?.courier_details?.height}</strong>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div> Breadth (cm) </div>
            <div>
              <strong>{order?.courier_details?.breadth}</strong>
            </div>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <div> Weight (gm) </div>
            <div>
              <strong>{order?.courier_details?.weight}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className='card-body'>
          <Formik
            initialValues={{
              length: 10,
              width: 10,
              height: 10,
              breadth: 10,
              weight: 100,
            }}
            validationSchema={Yup.object({
              length: Yup.string().required('Required'),
              width: Yup.string().required('Required'),
              height: Yup.string().required('Required'),
              breadth: Yup.string().required('Required'),
              weight: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await updateDimensions(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {(formik) => {
              console.log(formik);
              return (
                <Form>
                  <div className='d-flex justify-content-between'>
                    <div> Length (cm) </div>
                    <div>
                      <strong>
                        <input
                          type='number'
                          name='length'
                          onChange={formik.handleChange}
                          value={formik.values.length}
                        />
                      </strong>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div> Width (cm) </div>
                    <div>
                      <strong>
                        <input
                          type='number'
                          name='width'
                          onChange={formik.handleChange}
                          value={formik.values.width}
                        />
                      </strong>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div> Height (cm) </div>
                    <div>
                      <strong>
                        <input
                          type='number'
                          name='height'
                          onChange={formik.handleChange}
                          value={formik.values.height}
                        />
                      </strong>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div> Breadth (cm) </div>
                    <div>
                      <strong>
                        <input
                          type='number'
                          name='breadth'
                          onChange={formik.handleChange}
                          value={formik.values.breadth}
                        />
                      </strong>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex justify-content-between'>
                    <div> Weight (gm) </div>
                    <div>
                      <strong>
                        <input
                          type='number'
                          name='weight'
                          onChange={formik.handleChange}
                          value={formik.values.weight}
                        />
                      </strong>
                    </div>
                    <div>
                      <button> Save </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};
