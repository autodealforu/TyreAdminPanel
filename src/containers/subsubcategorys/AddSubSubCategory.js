import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory } from "react-router-dom";
import SubSubCategoryForm from "../../components/subsubcategorys/SubSubCategoryForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/subsubcategorys_enum";
import { useCreateSubSubCategory,useGetDropdownOptions } from "../../shared/hooks/UseSubSubCategory";
// import { useSelectAllSubSubCategory } from "../../shared/hooks/UseSubSubCategory";

const AddSubSubCategory = ({}) => {
  let history = useHistory();
  const [subsubcategory, addData] = useCreateSubSubCategory();
  const { add_subsubcategory_loading } = subsubcategory;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);
 
 

  const submitFormClicked = async (values) => {
    
    await addData(values);
    history.push(`/${LINK_URL}`);
  };

  const [dropdownOptions] = useGetDropdownOptions();

  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={`Add ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="Add"
        />
      </div>
      <div className="container-fluid">
        <div className="col-lg-9">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"> {PAGE_SINGLE_TITLE} </h4>
              <p className="card-title-desc">
                Enter Details to add {PAGE_SINGLE_TITLE}
              </p>
            </div>
            <SubSubCategoryForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_subsubcategory_loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubSubCategory;
