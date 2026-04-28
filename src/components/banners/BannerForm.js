import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import generateFields from '../../domain/generateFields';
import generateRequired from '../../domain/generateRequired';
function BannerForm({
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
      <div className='alert alert-info mb-4' style={{ backgroundColor: '#e3f2fd', color: '#0d47a1', border: '1px solid #bbdefb', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h5 className='alert-heading font-weight-bold' style={{ marginTop: 0, display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style={{ marginRight: '8px' }} viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          Image Dimension Guidelines
        </h5>
        <p className='mb-2' style={{ fontSize: '0.95rem' }}>Please prepare assets matching these constraints to prevent undesirable focal point cut-offs on mobile and desktop viewports:</p>
        <ul className='mb-0' style={{ paddingLeft: '20px', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <li><strong>Main Hero Banners (Video / Still):</strong> 1920 &times; 800 px (Cinematic wide) or 1920 &times; 1080 px.</li>
          <li><strong>Image Sliders:</strong> 1920 &times; 580 px.</li>
          <li><strong>Gallery Items:</strong> 4:3 layout ratios (e.g., 800 &times; 600 px).</li>
        </ul>
      </div>
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

export default BannerForm;
