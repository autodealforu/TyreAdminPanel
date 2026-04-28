import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import moment from 'moment';
function LoadIndexForm({
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

export default LoadIndexForm;
