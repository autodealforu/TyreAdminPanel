import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import generateFields from '../../domain/generateFields';
import generateRequired from '../../domain/generateRequired';
import FormComponents from '../common/FormComponents';
function VehicleForm({
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
      )}
    </div>
  );
}

export default VehicleForm;
