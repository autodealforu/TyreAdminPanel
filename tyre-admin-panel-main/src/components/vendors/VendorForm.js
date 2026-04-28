import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import moment from 'moment';
import generateFields from '../../domain/generateFields';
import generateRequired from '../../domain/generateRequired';
import {
  CheckBox,
  FileUpload,
  HTMLEditor,
  SelectBox,
  TextInput,
} from '../Form/Form';
import { INDIAN_STATES } from '../../domain/Enums';
function VendorForm({
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
    const newData = generateRequired({ inputFields });
    setRequiredCheck(newData);
  }, []);
  useEffect(() => {
    if (data) {
      const newData = generateFields({ inputFields: inputFields, data: data });
      setCustomData(newData);
    }
  }, [data]);
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
                    <div className='col-md-6'>
                      <TextInput
                        label='Store Name'
                        name='vendor.store_name'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <SelectBox
                        label='Profile Status'
                        name='vendor.profile_status'
                      >
                        <option value=''> -- None-- </option>
                        <option value='UNDER REVIEW'>UNDER REVIEW</option>
                        <option value='APPROVED'>APPROVED</option>
                        <option value='REJECTED'>REJECTED</option>
                      </SelectBox>
                    </div>
                    <div className='col-md-6'>
                      <SelectBox
                        label='Is Store Active?'
                        name='vendor.store_active'
                      >
                        <option value={true}>Active</option>
                        <option value={false}>In Active</option>
                      </SelectBox>
                    </div>
                    <div className='col-md-12'>
                      <HTMLEditor
                        title='Store Description'
                        item='vendor.store_description'
                        formik={formik}
                        col={12}
                        value={
                          formik.values &&
                          formik.values.vendor &&
                          formik.values.vendor.store_description
                        }
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='GST No'
                        name='vendor.gst_no'
                        type='text'
                      />
                    </div>
                    <FileUpload
                      title='GST Certificate'
                      item='vendor.gst_certificate'
                      formik={formik}
                      value={
                        formik.values.vendor &&
                        formik.values.vendor.gst_certificate
                      }
                    />
                    <FileUpload
                      title='Logo'
                      item='vendor.store_logo'
                      formik={formik}
                      value={
                        formik.values.vendor && formik.values.vendor.store_logo
                      }
                    />
                    <div className='col-md-12'>
                      <div className='p-2 mt-2 mb-2 bg-light'>
                        <p className='font-weight-bold'>Pickup Address</p>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Address 1'
                        name='vendor.pickup_address[0].address_1'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Address 2'
                        name='vendor.pickup_address[0].address_2'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='City'
                        name='vendor.pickup_address[0].city'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <SelectBox
                        label='State'
                        name='vendor.pickup_address[0].state'
                      >
                        <option value=''> --none-- </option>
                        {INDIAN_STATES &&
                          INDIAN_STATES.map((item) => {
                            return (
                              <option value={item.name}>{item.value}</option>
                            );
                          })}
                      </SelectBox>
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Pin *'
                        name='vendor.pickup_address[0].pin'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Landmark'
                        name='vendor.pickup_address[0].landmark'
                        type='text'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Latitude'
                        name='vendor.pickup_address[0].latitude'
                        type='number'
                        step='any'
                      />
                    </div>
                    <div className='col-md-6'>
                      <TextInput
                        label='Longitude'
                        name='vendor.pickup_address[0].longitude'
                        type='number'
                        step='any'
                      />
                    </div>
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

export default VendorForm;
