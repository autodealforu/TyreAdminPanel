import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import generateFields from '../../domain/generateFields';
import generateRequired from '../../domain/generateRequired';

function AlloyWheelForm({
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

  // Comprehensive validation schema for alloy wheels

  useEffect(() => {
    const newData = generateRequired({ inputFields });
    setRequiredCheck(newData);
  }, [inputFields]);

  useEffect(() => {
    if (data) {
      const newData = generateFields({ inputFields: inputFields, data: data });
      setCustomData(newData);
    }
  }, [data]);

  console.log('dropdown_options', dropdown_options, customData);

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
                return (
                  <Form className='row'>
                    <FormComponents
                      inputFields={inputFields}
                      formik={formik}
                      dropdown_options={dropdown_options}
                      loadOptions={loadOptions}
                      setFeaturedImage={setFeaturedImage}
                      setGallery={setGallery}
                      edit={edit}
                    />
                    <div className='col-12'>
                      <div className='card text-center'>
                        <div className='card-body'>
                          <button
                            type='submit'
                            className='btn btn-primary waves-effect waves-light'
                          >
                            Update Alloy Wheel
                          </button>
                          &nbsp;&nbsp;
                          <button
                            type='button'
                            onClick={() => history.goBack()}
                            className='btn btn-secondary waves-effect'
                          >
                            Go Back
                          </button>
                        </div>
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
            initialValues={initialValues}
            validationSchema={Yup.object(requiredCheck)}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              return (
                <Form className='row'>
                  <FormComponents
                    inputFields={inputFields}
                    formik={formik}
                    dropdown_options={dropdown_options}
                    loadOptions={loadOptions}
                    setFeaturedImage={setFeaturedImage}
                    setGallery={setGallery}
                  />
                  <div className='col-12'>
                    <div className='card text-center'>
                      <div className='card-body'>
                        <button
                          type='submit'
                          className='btn btn-primary waves-effect waves-light'
                        >
                          Create Alloy Wheel
                        </button>
                        &nbsp;&nbsp;
                        <button
                          type='button'
                          onClick={() => history.goBack()}
                          className='btn btn-secondary waves-effect'
                        >
                          Go Back
                        </button>
                      </div>
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

export default AlloyWheelForm;
