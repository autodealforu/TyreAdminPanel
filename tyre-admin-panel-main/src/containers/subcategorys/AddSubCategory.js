import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import SubCategoryForm from '../../components/subcategorys/SubCategoryForm';
import { convertToFormData } from '../../shared/upload';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/subcategorys_enum';
import {
  useCreateSubCategory,
  useGetDropdownOptions,
} from '../../shared/hooks/UseSubCategory';
// import { useSelectAllSubCategory } from "../../shared/hooks/UseSubCategory";

const AddSubCategory = ({}) => {
  let history = useHistory();
  const [subcategory, addData] = useCreateSubCategory();
  const { add_subcategory_loading } = subcategory;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);

  const submitFormClicked = async (values) => {
    await addData(values);
    history.push(`/${LINK_URL}`);
  };

  const [dropdownOptions] = useGetDropdownOptions();

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
            <SubCategoryForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_subcategory_loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
