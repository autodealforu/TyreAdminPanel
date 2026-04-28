import { Formik, Form } from 'formik';
import React, { useState } from 'react';

import { SelectBox } from '../Form/Form';
import * as Yup from 'yup';
import {
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
  useUpdateDeliveryCharges,
} from '../../shared/hooks/UseOrder';
import { ORDER_STATUS } from '../../domain/constant';

export const OrderUpdateCard = ({ order, user, reloadData }) => {
  const [editing, setEditing] = useState(false);
  const [updateOrderStatusData] = useUpdateOrderStatus();

  const orderStatusUpdateHandler = async (values) => {
    await updateOrderStatusData(order._id, values);
    reloadData(order._id);
    setEditing(false);
  };

  const [editPaymentStatus, setEditPaymentStatus] = useState(false);
  const [updatePaymentStatusData] = useUpdatePaymentStatus();

  const paymentStatusUpdateHandler = async (values) => {
    await updatePaymentStatusData(order._id, values);
    reloadData(order._id);
    setEditPaymentStatus(false);
  };

  const [editDeliveryCharges, setEditDeliveryCharges] = useState(false);
  const [updateDeliveryChargesData] = useUpdateDeliveryCharges();

  const deliveryChargesUpdateHandler = async (values) => {
    await updateDeliveryChargesData(order._id, values);
    reloadData(order._id);
    setEditDeliveryCharges(false);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h4 className='card-title'> Status </h4>
      </div>

      <div className='card-body'>
        {editing && user && user.role === 'SUPER ADMIN' ? (
          <div>
            <Formik
              initialValues={{
                order_status: order.status,
              }}
              validationSchema={Yup.object({
                order_status: Yup.string().required('Required'),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                await orderStatusUpdateHandler(values);
                resetForm();
                setSubmitting(false);
              }}
            >
              {(formik) => {
                console.log(formik);
                return (
                  <Form>
                    <div className='row'>
                      <div className='col-md-6'>
                        <SelectBox name='order_status'>
                          <option value=''> --none-- </option>
                          {ORDER_STATUS.map((item) => {
                            return <option value={item}> {item} </option>;
                          })}
                        </SelectBox>
                      </div>
                      <div className='col-md-6'>
                        <button type='submit' className='btn btn-warning'>
                          {' '}
                          Update{' '}
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        ) : (
          <div className='d-flex justify-content-between'>
            <div>{order.status}</div>
            {user && user.role === 'SUPER ADMIN' && (
              <div>
                {' '}
                <button
                  onClick={() => setEditing(true)}
                  className='btn btn-warning'
                >
                  {' '}
                  Change{' '}
                </button>
              </div>
            )}
          </div>
        )}
        <hr />
        <div className='d-flex justify-content-between'>
          <div> Payment Method </div>
          <div>
            <strong>{order.payment_method}</strong>
          </div>
        </div>
        <hr />
        {user && user.role === 'SUPER ADMIN' && (
          <div className='d-flex justify-content-between'>
            <div>
              Payment Status
              {user && user.role === 'SUPER ADMIN' && (
                <a onClick={() => setEditPaymentStatus(!editPaymentStatus)}>
                  <i
                    className={editPaymentStatus ? 'fa fa-edit' : 'fa fa-edit'}
                  ></i>
                </a>
              )}
            </div>
            <div>
              {!editPaymentStatus && user && user.role === 'SUPER ADMIN' ? (
                <strong>
                  {order.is_paid ? (
                    <span className='badge badge-success bg-success'>PAID</span>
                  ) : (
                    <span className='badge badge-danger bg-danger'>UNPAID</span>
                  )}
                </strong>
              ) : (
                <Formik
                  initialValues={{
                    is_paid: order.is_paid,
                  }}
                  validationSchema={Yup.object({
                    is_paid: Yup.boolean().required('Required'),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    await paymentStatusUpdateHandler({
                      is_paid: values.is_paid === 'true' ? true : false,
                    });
                    resetForm();
                    setSubmitting(false);
                  }}
                >
                  {(formik) => {
                    console.log(formik);
                    return (
                      <Form>
                        <div className='row'>
                          <div className='col-md-6'>
                            <SelectBox name='is_paid'>
                              <option value=''> --none-- </option>
                              <option value={true}> Paid </option>
                              <option value={false}> Unpaid </option>
                            </SelectBox>
                          </div>
                          <div className='col-md-6'>
                            <button type='submit' className='btn btn-warning'>
                              {' '}
                              Update{' '}
                            </button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </div>
          </div>
        )}
        <hr />
        {user && user.role === 'SUPER ADMIN' && (
          <>
            <div className='d-flex justify-content-between'>
              <div>Delivery Charges</div>
              <div>
                {!editDeliveryCharges ? (
                  <strong>
                    {order.commission && order.commission.delivery_charges ? (
                      <div>
                        {' '}
                        <a onClick={() => setEditDeliveryCharges(true)}>
                          {' '}
                          ₹{order.commission.delivery_charges}{' '}
                        </a>{' '}
                      </div>
                    ) : (
                      <div>
                        <a
                          className='btn btn-sm btn-success'
                          onClick={() => setEditDeliveryCharges(true)}
                        >
                          Update
                        </a>
                      </div>
                    )}
                  </strong>
                ) : (
                  <Formik
                    initialValues={{
                      delivery_charges:
                        order.commission && order.commission.delivery_charges
                          ? order.commission.delivery_charges
                          : 0,
                    }}
                    validationSchema={Yup.object({
                      delivery_charges: Yup.number().required('Required'),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      setSubmitting(true);
                      await deliveryChargesUpdateHandler({
                        delivery_charges: values.delivery_charges,
                      });
                      resetForm();
                      setSubmitting(false);
                    }}
                  >
                    {(formik) => {
                      console.log(formik);
                      return (
                        <Form>
                          <div className='row'>
                            <div className='col-md-6'>
                              <input
                                type='number'
                                name='delivery_charges'
                                className='form-control'
                                value={formik.values.delivery_charges}
                                onChange={formik.handleChange}
                              />
                            </div>
                            <div className='col-md-6'>
                              <button type='submit' className='btn btn-warning'>
                                {' '}
                                Update{' '}
                              </button>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                )}
              </div>
            </div>
            <hr />
          </>
        )}
      </div>
    </div>
  );
};
