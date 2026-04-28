import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import moment from 'moment';
import { CheckBox, SelectBox, TextInput } from '../Form/Form';
import ProductOptions from './PoruductOptions';

function OrderForm({
  data,
  edit,
  submitForm,
  setFeaturedImage,
  setGallery,
  inputFields,
  initialValues,
  dropdown_options,
  loadOptions,
}) {
  let history = useHistory();

  const [requiredCheck, setRequiredCheck] = useState({});
  const [customData, setCustomData] = useState(null);
  useEffect(() => {
    if (inputFields) {
      if (Object.keys(inputFields)) {
        const newRequiredCheck = {};
        Object.keys(inputFields).map((item, index) => {
          if (inputFields[item].required) {
            console.log(item);
            newRequiredCheck[item] = Yup.string().required('Required');
          }
        });

        setRequiredCheck(newRequiredCheck);
      }
    }
  }, []);
  // console.log(requiredCheck);
  useEffect(() => {
    if (data) {
      if (inputFields) {
        if (Object.keys(inputFields)) {
          const newDataCheck = {};
          Object.keys(inputFields).map((item, index) => {
            if (
              inputFields[item] &&
              inputFields[item].type === 'string' &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              if (inputFields[item].inputType === 'datetime-local') {
                newDataCheck[item] = moment(data[item]).format(
                  'yyyy-MM-DDThh:mm'
                );
              } else {
                if (inputFields[item].inputType === 'date') {
                  newDataCheck[item] = moment(data[item]).format('yyyy-MM-DD');
                } else {
                  newDataCheck[item] = data[item];
                }
              }
            }
            if (
              inputFields[item] &&
              inputFields[item].type === 'text' &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === 'checkbox' &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === 'html' &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === 'select' &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === 'related' &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item]
                ? !inputFields[item].static
                  ? data[item]._id
                  : data[item]
                : '';
            }
            if (inputFields[item] && inputFields[item].type === 'array') {
              newDataCheck[item] = data[item];
            }
          });
          setCustomData(newDataCheck);
        }
      }
    }
  }, [data]);
  // console.log("CUSTOM DATA", customData);
  return (
    <div className='card-body'>
      {edit ? (
        customData && (
          <div className='row'>
            <Formik
              initialValues={customData ? customData : initialValues}
              validationSchema={Yup.object(requiredCheck)}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                await submitForm(values);
                setSubmitting(false);
                resetForm(true);
              }}
            >
              {(formik) => {
                console.log(formik);
                return (
                  <Form>
                    <FormComponents
                      formik={formik}
                      inputFields={inputFields}
                      setFeaturedImage={setFeaturedImage}
                      dropdown_options={dropdown_options}
                      setGallery={setGallery}
                      edit={edit}
                      loadOptions={loadOptions}
                    />
                    <div className='row'>
                      <div className='col-md-12 text-center m-3'>
                        <button type='submit' className='btn btn-success'>
                          {formik.isSubmitting
                            ? 'Processing...'
                            : edit
                            ? 'Save & Continue'
                            : 'Save'}
                        </button>
                        <a
                          className='btn btn-secondary m-3'
                          onClick={history.goBack}
                          href='#goback'
                        >
                          <i className='fa fa-angle-left'></i> Go Back
                        </a>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        )
      ) : (
        <div className='row'>
          <Formik
            initialValues={customData ? customData : initialValues}
            validationSchema={Yup.object(requiredCheck)}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              // console.log(formik);
              return (
                <Form>
                  {/* <FormComponents
                    formik={formik}
                    inputFields={inputFields}
                    setFeaturedImage={setFeaturedImage}
                    dropdown_options={dropdown_options}
                    setGallery={setGallery}
                    edit={edit}
                    loadOptions={loadOptions}
                  /> */}
                  <div className='row'>
                    <div className='col-md-6'>
                      <TextInput
                        label='Order Date'
                        name='order_date'
                        type='date'
                      />
                    </div>
                    <div className='col-md-6'>
                      <SelectBox label='Status' name='status'>
                        <option value=''> --none-- </option>
                        <option value='PENDING'>PENDING</option>
                        <option value='PROCESSING'>PROCESSING</option>
                        <option value='READY TO DISPATCH'>
                          READY TO DISPATCH
                        </option>
                        <option value='DELIVERED'>DELIVERED</option>
                        <option value='REFUNDED'>REFUNDED</option>
                        <option value='CANCELLED'>CANCELLED</option>
                        <option value='FAILED'>FAILED</option>
                        <option value='RETURNED'>RETURNED</option>
                      </SelectBox>
                    </div>
                    <div className='col-md-6'>
                      <CheckBox name='is_paid'>Is Paid?</CheckBox>
                    </div>
                    <div className='col-md-6'>
                      <SelectBox label='Payment Method' name='payment_method'>
                        <option value=''> --none-- </option>
                        <option value='ONLINE'>ONLINE</option>
                        <option value='COD'>COD</option>
                      </SelectBox>
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Total Amount'
                        name='total_amount'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput label='Tax' name='tax' type='text' />
                    </div>
                    <div className='col-md-6'>
                      <TextInput label='Discount' name='discount' type='text' />
                    </div>

                    <div className='col-md-6'>
                      <TextInput
                        label='Delivery Charges'
                        name='delivery_charges'
                        type='number'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Logistic Partner Name'
                        name='logistic_partner_name'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Dispatch Number'
                        name='dispatch_number'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div>Shipping Address</div>
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Address 1'
                        name='shipping_address.address_1'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Address 2'
                        name='shipping_address.address_2'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Landmark'
                        name='shipping_address.landmark'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Pin'
                        name='shipping_address.pin'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='City'
                        name='shipping_address.city'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='State'
                        name='shipping_address.state'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div>Billing Address</div>
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Address 1'
                        name='billing_address.address_1'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Address 2'
                        name='billing_address.address_2'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Landmark'
                        name='billing_address.landmark'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Pin'
                        name='billing_address.pin'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='City'
                        name='billing_address.city'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='State'
                        name='billing_address.state'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div>Customer</div>
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='name'
                        name='customer.name'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Phone'
                        name='customer.phone'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Email'
                        name='customer.email'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div> Products </div>
                    </div>
                  </div>
                  <div className='row'>
                    <ProductOptions
                      formik={formik}
                      item='products'
                      inputFields={inputFields}
                      dropdown_options={dropdown_options}
                    />
                  </div>

                  <div className='row'>
                    <div className='col-md-12 text-center m-3'>
                      <button type='submit' className='btn btn-success'>
                        {formik.isSubmitting
                          ? 'Processing...'
                          : edit
                          ? 'Update'
                          : 'Save'}
                      </button>
                      <a
                        className='btn btn-secondary m-3'
                        onClick={history.goBack}
                        href='#goback'
                      >
                        <i className='fa fa-angle-left'></i> Go Back
                      </a>
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
}

export default OrderForm;
