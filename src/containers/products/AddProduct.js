import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import ProductForm from '../../components/products/ProductForm';
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/products_enum';
import {
  useCreateProduct,
  useGetDropdownOptions,
} from '../../shared/hooks/UseProduct';

const AddProduct = () => {
  let history = useHistory();
  const [product, addData] = useCreateProduct();
  const { add_product_loading } = product;

  const submitFormClicked = async (values) => {
    try {
      // Clean the data - remove empty strings and prepare for API
      const cleanedValues = {};
      Object.keys(values).forEach((key) => {
        const value = values[key];
        // Only include non-empty values
        if (value !== '' && value !== null && value !== undefined) {
          cleanedValues[key] = value;
        }
      });

      await addData(cleanedValues);
      history.push(`/${LINK_URL}`);
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Error: ' + (error.message || 'Failed to add product'));
    }
  };

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

  console.log('dropdownOptions', dropdownOptions);

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`Add ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='Add'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'> {PAGE_SINGLE_TITLE} </h4>
              <p className='card-title-desc'>
                Enter Details to add {PAGE_SINGLE_TITLE}
              </p>
            </div>
            <ProductForm
              edit={false}
              submitForm={submitFormClicked}
              dropdown_options={dropdownOptions}
              loadOptions={loadOptions}
              loading={add_product_loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
