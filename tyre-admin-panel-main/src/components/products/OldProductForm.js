import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import moment from 'moment';
import VariableOptions from './VariableOptions';
import VariationTable from './VariationTable';
import { SelectBox, TextInput } from '../Form/Form';
import CommissionForm from './CommissionForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  useAllVendors,
  useGetDropdownOptions,
} from '../../shared/hooks/UseVendor';
import { useLoadUser } from '../../shared/hooks/UseAuth';
function ProductForm({
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
  const auth_data = useSelector((state) => state.auth);

  let history = useHistory();
  let newInitialValues = {
    name: '',
    collections: [],
    product_category: '',
    description: '',
    media: [],
    regular_price: '',
    sale_price: '',
    tax: '',
    sku: '',
    in_stock: true,
    stock: 100,
    weight: '',
    length: '',
    width: '',
    height: '',
    is_variable_product: true,
    variation_attrs: [
      {
        label: '',
        options: [],
      },
    ],
    variations: [],
  };

  const [vendor_data, setPageNumber, deleteBtnClicked] = useAllVendors();
  const { vendors_loading, vendors, total_vendors, page, pages } = vendor_data;
  console.log('Vendors -', vendors);

  const [user_data] = useLoadUser();
  const { user } = user_data;
  console.log('USER -', user);
  return (
    <div className='card-body'>
      {edit ? (
        <div className='row'>
          <Formik
            initialValues={{
              name: data.name,
              slug: data.slug,
              product_status: data.product_status,
              vendor: data.vendor && data.vendor._id,
              collections: data.collections,
              product_category: data.product_category
                ? data.product_category._id
                : '',
              commission: data.product_category
                ? data.product_category.commission
                : '',
              description: data.description,
              media: data.media,
              regular_price: data.regular_price,
              sale_price: data.sale_price,
              tax: data.tax,
              sku: data.sku,
              in_stock: data.in_stock,
              stock: data.stock,
              weight: data.weight,
              length: data.length,
              width: data.width,
              height: data.height,
              is_variable_product: data.is_variable_product,
              variation_attrs: data.variation_attrs,
              variations: data.variations ? data.variations.variation_name : '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
              collections: Yup.array().required('Required').min(1),
              product_category: Yup.string().required('Required'),
              regular_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
              sale_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
              tax: Yup.number().positive('Numbers Only'),
              weight: Yup.number().positive('Numbers Only'),
              length: Yup.number().positive('Numbers Only'),
              height: Yup.number().positive('Numbers Only'),
              width: Yup.number().positive('Numbers Only'),
              stock: Yup.number().positive('Numbers Only'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              console.log(formik.values);
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
                  {user && user.role === 'SUPER ADMIN' ? (
                    <div className='col-md-6'>
                      <SelectBox
                        label='Vendor'
                        name='vendor'
                        type='related'
                        onChange={(e) => {
                          formik.setFieldValue('vendor', e.target.value);
                        }}
                      >
                        {vendors &&
                          vendors.map((vendor) => {
                            return (
                              <>
                                <option value={vendor._id}>
                                  {vendor.name}
                                </option>
                              </>
                            );
                          })}
                      </SelectBox>
                    </div>
                  ) : null}

                  <CommissionForm
                    formik={formik}
                    dropdown_options={dropdown_options}
                  />
                  {formik.values.is_variable_product && (
                    <>
                      <VariableOptions
                        formik={formik}
                        item='variation_attrs'
                        inputFields={inputFields}
                      />
                      <VariationTable formik={formik} item='variations' />
                    </>
                  )}
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
      ) : (
        <div className='row'>
          <Formik
            initialValues={newInitialValues}
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
              product_category: Yup.string().required('Required'),
              collections: Yup.array().required('Required').min(1),
              regular_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
              sale_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
              tax: Yup.number().positive('Numbers Only'),
              weight: Yup.number().positive('Numbers Only'),
              length: Yup.number().positive('Numbers Only'),
              height: Yup.number().positive('Numbers Only'),
              width: Yup.number().positive('Numbers Only'),
              stock: Yup.number().positive('Numbers Only'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              console.log(JSON.stringify(formik.values));
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
                  <CommissionForm
                    formik={formik}
                    dropdown_options={dropdown_options}
                  />

                  {formik.values.is_variable_product && (
                    <>
                      <VariableOptions
                        formik={formik}
                        item='variation_attrs'
                        inputFields={inputFields}
                      />
                      <VariationTable formik={formik} item='variations' />
                    </>
                  )}
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

export default ProductForm;
