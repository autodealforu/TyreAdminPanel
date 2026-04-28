import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import generateRequired from '../../domain/generateRequired';
import {
  getFieldsForProductType,
  getInitialValuesForProductType,
} from '../../shared/enums/unified_products_enum';

function UnifiedProductForm({
  data,
  edit,
  submitForm,
  setFeaturedImage,
  setGallery,
  dropdown_options,
  loadOptions,
}) {
  let history = useHistory();

  const [selectedProductType, setSelectedProductType] = useState(
    edit && data ? data.product_category : ''
  );
  const [currentFields, setCurrentFields] = useState({});
  const [currentInitialValues, setCurrentInitialValues] = useState({});
  const [requiredCheck, setRequiredCheck] = useState({});

  // Update fields when product type changes
  useEffect(() => {
    if (selectedProductType) {
      const fields = getFieldsForProductType(selectedProductType);
      const initialValues = getInitialValuesForProductType(selectedProductType);

      setCurrentFields(fields);
      setCurrentInitialValues(initialValues);

      // Generate validation
      const validation = generateRequired({ inputFields: fields });
      setRequiredCheck(validation);
    }
  }, [selectedProductType]);

  // Handle product type change
  const handleProductTypeChange = (productType, setFieldValue) => {
    setSelectedProductType(productType);

    // Reset form values when product type changes
    const newInitialValues = getInitialValuesForProductType(productType);
    Object.keys(newInitialValues).forEach((key) => {
      setFieldValue(key, newInitialValues[key]);
    });
  };

  // Prepare form data for submission
  const handleSubmit = async (values, formikBag) => {
    try {
      const { product_category, ...otherValues } = values;

      // Separate pricing data from product-specific data
      const pricingFields = [
        'cost_price',
        'mrp_price',
        'rcp_price',
        'auto_deal_price',
        'stock',
        'in_stock',
        'vendor',
        'published_status',
      ];

      const pricing_data = {};
      const product_data = {};

      Object.keys(otherValues).forEach((key) => {
        if (pricingFields.includes(key)) {
          pricing_data[key] = otherValues[key];
        } else {
          product_data[key] = otherValues[key];
        }
      });

      const formData = {
        product_category,
        product_data,
        pricing_data,
      };

      await submitForm(formData);
      formikBag.setSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      formikBag.setSubmitting(false);
    }
  };

  // Merge initial values with edit data
  const getFormInitialValues = () => {
    if (edit && data) {
      // For edit mode, flatten the data structure
      const flattenedData = {
        product_category: data.product_category,
        cost_price: data.cost_price || '',
        mrp_price: data.mrp_price || '',
        rcp_price: data.rcp_price || '',
        auto_deal_price: data.auto_deal_price || '',
        stock: data.stock || '',
        in_stock: data.in_stock || false,
        vendor: data.vendor?._id || '',
        published_status: data.published_status || 'DRAFT',
      };

      // Add product-specific data based on category
      if (data.product_category === 'TYRE' && data.tyre) {
        Object.assign(flattenedData, data.tyre);
      } else if (data.product_category === 'ALLOY_WHEEL' && data.alloy_wheel) {
        Object.assign(flattenedData, data.alloy_wheel);
      } else if (data.product_category === 'SERVICE' && data.service) {
        Object.assign(flattenedData, data.service);
      }

      return flattenedData;
    }

    return currentInitialValues;
  };

  return (
    <div className='card-body'>
      {/* Product Type Selection */}
      {!edit && (
        <div className='row mb-4'>
          <div className='col-12'>
            <div className='alert alert-info'>
              <h5 className='mb-3'>
                <i className='fas fa-info-circle'></i> Select Product Type
              </h5>
              <p>Choose the type of product you want to create:</p>
              <div className='btn-group' role='group'>
                <button
                  type='button'
                  className={`btn ${
                    selectedProductType === 'TYRE'
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => handleProductTypeChange('TYRE', () => {})}
                >
                  <i className='fas fa-circle'></i> Tyre
                </button>
                <button
                  type='button'
                  className={`btn ${
                    selectedProductType === 'ALLOY_WHEEL'
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() =>
                    handleProductTypeChange('ALLOY_WHEEL', () => {})
                  }
                >
                  <i className='fas fa-cog'></i> Alloy Wheel
                </button>
                <button
                  type='button'
                  className={`btn ${
                    selectedProductType === 'SERVICE'
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => handleProductTypeChange('SERVICE', () => {})}
                >
                  <i className='fas fa-wrench'></i> Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Form */}
      {(selectedProductType || edit) &&
        Object.keys(currentFields).length > 0 && (
          <div className='row'>
            <div className='col-12'>
              <div className='alert alert-success'>
                <h5>
                  <i className='fas fa-check-circle'></i> Creating{' '}
                  {selectedProductType === 'TYRE' && 'Tyre'}
                  {selectedProductType === 'ALLOY_WHEEL' && 'Alloy Wheel'}
                  {selectedProductType === 'SERVICE' && 'Service'} Product
                </h5>
                <p>Fill in the details below to create your product.</p>
              </div>
            </div>

            <Formik
              initialValues={getFormInitialValues()}
              validationSchema={Yup.object(requiredCheck)}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {(formik) => {
                // Update product type handler for formik
                const handleProductTypeChangeWithFormik = (productType) => {
                  handleProductTypeChange(productType, formik.setFieldValue);
                };

                return (
                  <Form className='row'>
                    {/* Hidden product category field */}
                    <input
                      type='hidden'
                      name='product_category'
                      value={selectedProductType}
                    />

                    {/* Product Type Selection in Edit Mode */}
                    {edit && (
                      <div className='col-12 mb-3'>
                        <div className='alert alert-warning'>
                          <strong>Product Type:</strong> {data.product_category}
                          <br />
                          <small>
                            Product type cannot be changed after creation.
                          </small>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Fields */}
                    <FormComponents
                      inputFields={currentFields}
                      formik={formik}
                      dropdown_options={dropdown_options}
                      loadOptions={loadOptions}
                      setFeaturedImage={setFeaturedImage}
                      setGallery={setGallery}
                    />

                    {/* Submit Buttons */}
                    <div className='col-12'>
                      <div className='card text-center'>
                        <div className='card-body'>
                          <button
                            type='submit'
                            className='btn btn-primary waves-effect waves-light'
                            disabled={formik.isSubmitting}
                          >
                            {formik.isSubmitting ? (
                              <>
                                <span className='spinner-border spinner-border-sm me-2' />
                                {edit ? 'Updating...' : 'Creating...'}
                              </>
                            ) : (
                              <>{edit ? 'Update Product' : 'Create Product'}</>
                            )}
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

      {/* No Product Type Selected */}
      {!selectedProductType && !edit && (
        <div className='row'>
          <div className='col-12'>
            <div className='alert alert-warning text-center'>
              <h5>
                <i className='fas fa-exclamation-triangle'></i> Select Product
                Type
              </h5>
              <p>Please select a product type above to continue.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnifiedProductForm;
