import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import SubSubSubCategoryForm from "../../components/subsubsubcategorys/SubSubSubCategoryForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL
} from "../../shared/enums/subsubsubcategorys_enum";
import { useUpdateSubSubSubCategory, useSingleSubSubSubCategory,useGetDropdownOptions } from "../../shared/hooks/UseSubSubSubCategory";
// import { useSelectAllSubSubSubCategory } from "../../shared/hooks/UseSubSubSubCategory";

const EditSubSubSubCategory = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleSubSubSubCategory(match.params.id);
  const [updateData] = useUpdateSubSubSubCategory();
  const { subsubsubcategory_loading, subsubsubcategory, edit_subsubsubcategory_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);
  
  

  const [dropdownOptions] = useGetDropdownOptions();
  const submitFormClicked = async values => {
    
    await updateData(subsubsubcategory._id, values);
    history.push(`/${LINK_URL}/${subsubsubcategory._id}/view`);
  };

  

  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={`Edit ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="Edit"
        />
      </div>
      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="card">
            {!subsubsubcategory_loading ? (
              subsubsubcategory && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {subsubsubcategory[Object.keys(inputFields)[0]]} -{" "}
                        <span>Edit</span>{" "}
                      </h4>
                      <p className="card-title-desc">
                        <Link
                          to={`/${LINK_URL}`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-angle-left"></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${subsubsubcategory._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <SubSubSubCategoryForm
                    data={subsubsubcategory}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_subsubsubcategory_loading}
                  />
                </div>
              )
            ) : (
              <div className="text-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubSubSubCategory;
