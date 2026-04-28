import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import SubSubSubSubCategoryForm from "../../components/subsubsubsubcategorys/SubSubSubSubCategoryForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL
} from "../../shared/enums/subsubsubsubcategorys_enum";
import { useUpdateSubSubSubSubCategory, useSingleSubSubSubSubCategory,useGetDropdownOptions } from "../../shared/hooks/UseSubSubSubSubCategory";
// import { useSelectAllSubSubSubSubCategory } from "../../shared/hooks/UseSubSubSubSubCategory";

const EditSubSubSubSubCategory = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleSubSubSubSubCategory(match.params.id);
  const [updateData] = useUpdateSubSubSubSubCategory();
  const { subsubsubsubcategory_loading, subsubsubsubcategory, edit_subsubsubsubcategory_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);
  
  

  const [dropdownOptions] = useGetDropdownOptions();
  const submitFormClicked = async values => {
    
    await updateData(subsubsubsubcategory._id, values);
    history.push(`/${LINK_URL}/${subsubsubsubcategory._id}/view`);
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
            {!subsubsubsubcategory_loading ? (
              subsubsubsubcategory && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {subsubsubsubcategory[Object.keys(inputFields)[0]]} -{" "}
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
                          to={`/${LINK_URL}/${subsubsubsubcategory._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <SubSubSubSubCategoryForm
                    data={subsubsubsubcategory}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_subsubsubsubcategory_loading}
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

export default EditSubSubSubSubCategory;
