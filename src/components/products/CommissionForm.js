import React, { useState } from 'react';
import { TextInput, SelectBox } from '../Form/Form';
import { useSelectAllSubCategory } from '../../shared/hooks/UseSubCategory';
import { useSelectAllSubSubCategory } from '../../shared/hooks/UseSubSubCategory';
import { useSelectAllSubSubSubCategory } from '../../shared/hooks/UseSubSubSubCategory';
import { useSelectAllSubSubSubSubCategory } from '../../shared/hooks/UseSubSubSubSubCategory';

function CommissionForm({ formik, dropdown_options }) {
  const [subcategory_data] = useSelectAllSubCategory();
  const [sub_sub_category_data] = useSelectAllSubSubCategory();

  const [sub_category_options, setSub_category_Options] = useState(null);
  const [sub_sub_category_options, setSub_sub_category_options] =
    useState(null);
  const [commission, setCommission] = useState(null);

  const { all_subcategorys } = subcategory_data;
  const { all_subsubcategorys } = sub_sub_category_data;

  const showSubCategoryOptions = (selectOption) => {
    if (dropdown_options && dropdown_options.product_category) {
      const filteredCategoriesData = dropdown_options.product_category.filter(
        (item) => item.value == selectOption
      );
      if (
        filteredCategoriesData &&
        filteredCategoriesData.length > 0 &&
        filteredCategoriesData[0].product_category
      ) {
        setCommission(filteredCategoriesData[0].product_category.commission);
      }
    }
  };

  const showSubSubCategoryOptions = (selectOption) => {
    console.log('SELECT OPTION', selectOption);
    console.log('ALL SUBCATEGORIS', all_subcategorys);
    if (all_subcategorys) {
      const filteredCategoriesData = all_subcategorys.filter(
        (item) => item.value == selectOption
      );
      if (filteredCategoriesData && filteredCategoriesData.length > 0) {
        setCommission(filteredCategoriesData[0].commission);
      }
    }
  };

  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='p-2 mt-2 mb-2 bg-light'>
          <p className='font-weight-bold'> Commission Section </p>
        </div>
      </div>

      <div className='col-md-6'>
        <SelectBox
          label='Category'
          name='product_category'
          onChange={(e) => {
            formik.setFieldValue('product_category', e.target.value);
            formik.setFieldValue('sub_category', null);
            formik.setFieldValue('sub_sub_category', null);
            showSubCategoryOptions(e.target.value);
          }}
        >
          <option value=''> --none-- </option>
          {dropdown_options &&
            dropdown_options.product_category &&
            dropdown_options.product_category.map((item) => {
              return <option value={item.value}> {item.label} </option>;
            })}
        </SelectBox>
      </div>
      {formik.values.product_category && (
        <div className='col-md-6'>
          <SelectBox
            label='Sub Category'
            name='sub_category'
            onChange={(e) => {
              formik.setFieldValue('sub_category', e.target.value);
              showSubSubCategoryOptions(e.target.value);
            }}
          >
            <option value=''> --none-- </option>
            {all_subcategorys &&
              formik.values.product_category &&
              all_subcategorys
                .filter(
                  (item) => item.category == formik.values.product_category
                )
                .map((item) => {
                  return <option value={item._id}> {item.name} </option>;
                })}
          </SelectBox>
        </div>
      )}
      {formik.values.sub_category &&
        all_subsubcategorys &&
        all_subsubcategorys.filter(
          (item) => item.sub_category == formik.values.sub_category
        ) &&
        all_subsubcategorys.filter(
          (item) => item.sub_category == formik.values.sub_category
        ).length > 0 && (
          <div className='col-md-6'>
            <SelectBox
              label='Sub Sub Category'
              name='sub_sub_category'
              onChange={(e) => {
                formik.setFieldValue('sub_sub_category', e.target.value);
              }}
            >
              <option value=''> --none-- </option>
              {all_subsubcategorys &&
                formik.values.product_category &&
                formik.values.sub_category &&
                all_subsubcategorys
                  .filter(
                    (item) => item.sub_category == formik.values.sub_category
                  )
                  .map((item) => {
                    return <option value={item._id}> {item.name} </option>;
                  })}
            </SelectBox>
          </div>
        )}
      <div className='col-md-6'>
        <TextInput label='Regular Price' name='regular_price' type='number' />
      </div>
      <div className='col-md-6'>
        <TextInput label='Sale Price' name='sale_price' type='number' />
      </div>

      <div className='col-md-6'>
        <SelectBox label='tax' name='tax'>
          <option value=''></option>
          <option value={5}>5%</option>
          <option value={12}>12%</option>
          <option value={18}>18%</option>
          <option value={28}>28%</option>
        </SelectBox>
      </div>

      {formik.values.sale_price && commission && (
        <>
          <div>
            <h4 className='mb-4'> Payout Structure </h4>
            <table className='table table-bordered '>
              <tbody>
                <tr>
                  <td> Total Amount </td>
                  <td> ₹{formik.values.sale_price} </td>
                </tr>
                <tr>
                  <td> Commission </td>
                  <td>
                    {' '}
                    - ₹
                    {parseFloat(
                      (formik.values.sale_price * commission) / 100
                    ).toFixed(2)}{' '}
                    ({commission}%)
                  </td>
                </tr>
                <tr>
                  <td> GST (18% on Commission) </td>
                  <td>
                    {' '}
                    -₹
                    {parseFloat(
                      (formik.values.sale_price * commission) / 100
                    ).toFixed(2) * 0.18}{' '}
                    ({commission}%)
                  </td>
                </tr>
                <tr>
                  <td> Service Charges </td>
                  <td> - ₹0</td>
                </tr>
                <tr>
                  <td> Shipping Charges </td>
                  <td>
                    {' '}
                    -₹
                    {60} (approx. depending on the distance)
                  </td>
                </tr>
                <tr>
                  <td> COD Charges </td>
                  <td>
                    {' '}
                    -₹
                    {60} (approx. depending on the provider)
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style={{ fontWeight: 'bold' }}>
                      {' '}
                      Amount For Vendor (if COD)
                    </p>{' '}
                  </td>
                  <td>
                    {' '}
                    <p style={{ fontWeight: 'bold' }}>
                      ₹
                      {formik.values.sale_price -
                        parseFloat(
                          (formik.values.sale_price * commission) / 100
                        ).toFixed(2) -
                        parseFloat(
                          (formik.values.sale_price * commission) / 100
                        ).toFixed(2) *
                          0.18 -
                        120}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    {' '}
                    <p style={{ fontWeight: 'bold' }}>
                      Amount For Vendor (if Paid Online)
                    </p>{' '}
                  </td>
                  <td>
                    {' '}
                    <p style={{ fontWeight: 'bold' }}>
                      ₹
                      {formik.values.sale_price -
                        parseFloat(
                          (formik.values.sale_price * commission) / 100
                        ).toFixed(2) -
                        parseFloat(
                          (formik.values.sale_price * commission) / 100
                        ).toFixed(2) *
                          0.18 -
                        60}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default CommissionForm;
