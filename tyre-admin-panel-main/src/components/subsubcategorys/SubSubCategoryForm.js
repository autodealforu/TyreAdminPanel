import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import { useSelectAllSubCategory } from '../../shared/hooks/UseSubCategory';
import moment from 'moment';
import { SelectBox } from '../Form/Form';
import generateFields from '../../domain/generateFields';
import generateRequired from '../../domain/generateRequired';
function SubSubCategoryForm({
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
  const [sub_category_data] = useSelectAllSubCategory();
  const { all_subcategorys } = sub_category_data;
  useEffect(() => {
    const newData = generateRequired({ inputFields });
    setRequiredCheck(newData);
  }, []);
  useEffect(() => {
    if (data) {
      const newData = generateFields({ inputFields: inputFields, data: data });

      setCustomData({
        ...newData,
        sub_category: data.sub_category ? data.sub_category._id : '',
      });
    }
  }, [data]);

  console.log('Sub Category', customData);

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
                      <div className='col-md-6'>
                        <SelectBox label='Sub Category' name='sub_category'>
                          <option value=''> --none-- </option>
                          {formik.values.category &&
                            all_subcategorys &&
                            all_subcategorys.filter(
                              (item) => item.category === formik.values.category
                            ) &&
                            all_subcategorys
                              .filter(
                                (item) =>
                                  item.category === formik.values.category
                              )
                              .map((item) => {
                                return (
                                  <option value={item._id}>
                                    {' '}
                                    {item.name}{' '}
                                  </option>
                                );
                              })}
                        </SelectBox>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12 text-center m-3'>
                        <button type='submit' className='btn btn-success'>
                          {formik.isSubmitting
                            ? 'Processing...'
                            : edit
                            ? 'Update'
                            : 'नया बनाए'}
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
                      <SelectBox label='Sub Category' name='sub_category'>
                        <option value=''> --none-- </option>
                        {formik.values.category &&
                          all_subcategorys &&
                          all_subcategorys.filter(
                            (item) => item.category == formik.values.category
                          ) &&
                          all_subcategorys
                            .filter(
                              (item) => item.category == formik.values.category
                            )
                            .map((item) => {
                              return (
                                <option value={item._id}> {item.name} </option>
                              );
                            })}
                      </SelectBox>
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

export default SubSubCategoryForm;
