import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import SubCategoryForm from "../../components/subcategorys/SubCategoryForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL
} from "../../shared/enums/subcategorys_enum";
import { useUpdateSubCategory, useSingleSubCategory,useGetDropdownOptions } from "../../shared/hooks/UseSubCategory";
// import { useSelectAllSubCategory } from "../../shared/hooks/UseSubCategory";

const EditSubCategory = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleSubCategory(match.params.id);
  const [updateData] = useUpdateSubCategory();
  const { subcategory_loading, subcategory, edit_subcategory_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);
  
  

  const [dropdownOptions] = useGetDropdownOptions();
  const submitFormClicked = async values => {
    
    await updateData(subcategory._id, values);
    history.push(`/${LINK_URL}/${subcategory._id}/view`);
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
            {!subcategory_loading ? (
              subcategory && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {subcategory[Object.keys(inputFields)[0]]} -{" "}
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
                          to={`/${LINK_URL}/${subcategory._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <SubCategoryForm
                    data={subcategory}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_subcategory_loading}
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

export default EditSubCategory;
