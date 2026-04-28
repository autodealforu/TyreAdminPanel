import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import generateRequired from '../../domain/generateRequired';
import generateFields from '../../domain/generateFields';
import { inputFields, initialValues } from '../../shared/enums/products_enum';

const LINK_URL = 'products';

const ProductForm = ({
  edit = false,
  data = null,
  submitForm,
  dropdown_options = {},
  loadOptions,
  loading = false,
}) => {
  const history = useHistory();
  const [requiredCheck, setRequiredCheck] = useState({});
  const [customData, setCustomData] = useState(null);

  useEffect(() => {
    const newData = generateRequired({ inputFields });
    setRequiredCheck(newData);
  }, [inputFields]);

  useEffect(() => {
    if (edit && data) {
      const newData = generateFields({ inputFields: inputFields, data: data });
      setCustomData(newData);
    }
  }, [edit, data, inputFields]);

  const formInitialValues = edit && customData ? customData : initialValues;

  // Debug logging
  console.log('ProductForm Debug:', {
    dropdown_options,
    inputFields,
    formInitialValues,
  });

  return (
    <div className='card-body'>
      <Formik
        initialValues={formInitialValues}
        validationSchema={Yup.object(requiredCheck)}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          // Make sure the appropriate reference field is required based on category
          if (values.product_category === 'TYRE' && !values.tyre) {
            alert('Please select a tyre');
            setSubmitting(false);
            return;
          }
          if (
            values.product_category === 'ALLOY_WHEEL' &&
            !values.alloy_wheel
          ) {
            alert('Please select an alloy wheel');
            setSubmitting(false);
            return;
          }
          if (values.product_category === 'SERVICE' && !values.service) {
            alert('Please select a service');
            setSubmitting(false);
            return;
          }

          await submitForm(values);
          setSubmitting(false);
          if (!edit) resetForm(true);
          history.push(`/${LINK_URL}`);
        }}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form className='row'>
            <FormComponents
              inputFields={inputFields}
              formik={formik}
              dropdown_options={dropdown_options}
              loadOptions={loadOptions}
            />

            <div className='col-12'>
              <div className='d-flex justify-content-between'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => history.push(`/${LINK_URL}`)}
                >
                  Go Back
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={formik.isSubmitting || loading}
                >
                  {formik.isSubmitting || loading
                    ? 'Saving...'
                    : edit
                    ? 'Update Product'
                    : 'Add Product'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
