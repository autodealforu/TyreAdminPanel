import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import ProductcategoryForm from "../../components/productcategorys/ProductcategoryForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/productcategorys_enum";
import {
  useUpdateProductcategory,
  useSingleProductcategory,
  useGetDropdownOptions,
} from "../../shared/hooks/UseProductcategory";
// import { useSelectAllProductcategory } from "../../shared/hooks/UseProductcategory";

const EditProductcategory = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleProductcategory(match.params.id);
  const [updateData] = useUpdateProductcategory();
  const {
    productcategory_loading,
    productcategory,
    edit_productcategory_loading,
  } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    // const data = await convertToFormData({ values, featuredImage });
    await updateData(productcategory._id, values);
    history.push(`/${LINK_URL}/${productcategory._id}/view`);
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
            {!productcategory_loading ? (
              productcategory && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {productcategory[Object.keys(inputFields)[0]]} -{" "}
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
                          to={`/${LINK_URL}/${productcategory._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <ProductcategoryForm
                    data={productcategory}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_productcategory_loading}
                    loadOptions={loadOptions}
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

export default EditProductcategory;
