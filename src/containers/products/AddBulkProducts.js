import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import ProductForm from '../../components/products/ProductForm';
import { convertToFormData } from '../../shared/upload';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/products_enum';
import {
  useCreateProduct,
  useGetDropdownOptions,
} from '../../shared/hooks/UseProduct';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FileUpload, SelectBox } from '../../components/Form/Form';
import { useSelectAllSubCategory } from '../../shared/hooks/UseSubCategory';
import { useSelectAllSubSubCategory } from '../../shared/hooks/UseSubSubCategory';
// import { useSelectAllProduct } from "../../shared/hooks/UseProduct";
import { useCreateBulk } from '../../shared/hooks/UseBulk';

const AddBulkProducts = ({}) => {
  let history = useHistory();
  const [product, addData] = useCreateProduct();
  const { add_product_loading } = product;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [bulk, addBulk] = useCreateBulk();

  const submitFormClicked = async (values) => {
    await addData(values);
    history.push(`/${LINK_URL}`);
  };

  const [dropdown_options, loadOptions] = useGetDropdownOptions();
  const [showBulkUpload, setShowBulkUpload] = useState(false);

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
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`Bulk Uploads`}
          mainLinkTitle={'Bulk Uploads'}
          mainLinkUrl={'/products/bulk-upload'}
          activeLink='Add'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-header'>
              <div className='d-flex justify-content-between'>
                <div>
                  <h4 className='card-title'> Product Bulk Upload </h4>
                </div>
                <div>
                  <a
                    href='/pickkaro-bulk-upload.csv'
                    className='btn btn-success'
                  >
                    {' '}
                    Download Sample File{' '}
                  </a>
                </div>
              </div>

              <div>
                <a onClick={() => setShowBulkUpload(true)}>
                  {' '}
                  Upload Bulk Products{' '}
                </a>
              </div>
              <Formik
                initialValues={{
                  file: '',
                  product_category: '',
                  sub_category: '',
                  sub_sub_category: '',
                }}
                validationSchema={Yup.object({
                  file: Yup.string('Required').required('Required'),
                  product_category: Yup.string('Required').required('Required'),
                  sub_category: Yup.string('Required').required('Required'),
                  sub_sub_category: Yup.string('Required').required('Required'),
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  addBulk(values);
                  resetForm();
                  setSubmitting(false);
                }}
              >
                {(formik) => {
                  console.log(formik);
                  return (
                    <Form>
                      <div className='row'>
                        <div className='col-md-6'>
                          <SelectBox
                            label='Category'
                            name='product_category'
                            onChange={(e) => {
                              formik.setFieldValue(
                                'product_category',
                                e.target.value
                              );
                              formik.setFieldValue('sub_category', null);
                              formik.setFieldValue('sub_sub_category', null);
                              showSubCategoryOptions(e.target.value);
                            }}
                          >
                            <option value=''> --none-- </option>
                            {dropdown_options &&
                              dropdown_options.product_category &&
                              dropdown_options.product_category.map((item) => {
                                return (
                                  <option value={item.value}>
                                    {' '}
                                    {item.label}{' '}
                                  </option>
                                );
                              })}
                          </SelectBox>
                        </div>
                        {formik.values.product_category && (
                          <div className='col-md-6'>
                            <SelectBox
                              label='Sub Category'
                              name='sub_category'
                              onChange={(e) => {
                                formik.setFieldValue(
                                  'sub_category',
                                  e.target.value
                                );
                                showSubSubCategoryOptions(e.target.value);
                              }}
                            >
                              <option value=''> --none-- </option>
                              {all_subcategorys &&
                                formik.values.product_category &&
                                all_subcategorys
                                  .filter(
                                    (item) =>
                                      item.category ==
                                      formik.values.product_category
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
                        )}
                        {formik.values.sub_category &&
                          all_subsubcategorys &&
                          all_subsubcategorys.filter(
                            (item) =>
                              item.sub_category == formik.values.sub_category
                          ) &&
                          all_subsubcategorys.filter(
                            (item) =>
                              item.sub_category == formik.values.sub_category
                          ).length > 0 && (
                            <div className='col-md-6'>
                              <SelectBox
                                label='Sub Sub Category'
                                name='sub_sub_category'
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    'sub_sub_category',
                                    e.target.value
                                  );
                                }}
                              >
                                <option value=''> --none-- </option>
                                {all_subsubcategorys &&
                                  formik.values.product_category &&
                                  formik.values.sub_category &&
                                  all_subsubcategorys
                                    .filter(
                                      (item) =>
                                        item.sub_category ==
                                        formik.values.sub_category
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
                          )}
                        <div className='col-md-6'>
                          <FileUpload
                            title='Upload CSV File'
                            formik={formik}
                            item={'file'}
                            value={formik.values.file}
                          />
                          {formik.errors && formik.errors.file && (
                            <div className='text-danger'>
                              {formik.errors.file}
                            </div>
                          )}
                        </div>
                        <div className='col-md-6 mt-3'>
                          <button
                            type='submit'
                            className='btn btn-primary'
                            disabled={formik.isSubmitting}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBulkProducts;
