import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import ProductForm from "../../components/products/ProductForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/products_enum";
import {
  useUpdateProduct,
  useSingleProduct,
  useGetDropdownOptions,
} from "../../shared/hooks/UseProduct";
import { useLoadUser } from "../../shared/hooks/UseAuth";
// import { useSelectAllProduct } from "../../shared/hooks/UseProduct";

const EditProduct = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleProduct(match.params.id);
  const [updateData] = useUpdateProduct();
  const [user_data] = useLoadUser()

  const { product_loading, product, edit_product_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const { user } = user_data;
  console.log("USER -", user);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    await updateData(product._id, values);
    history.push(`/${LINK_URL}`);

  };

  const handleProductStatusChange = async (status) => {
    await updateData(product._id, { product_status: status });
    history.push(`/${LINK_URL}`);
  }

  const [showProductStatusButton, setShowProductStatusButton] = useState(false)

  const handleStatusButton = () => {
    setShowProductStatusButton(!showProductStatusButton)
  }

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
            {!product_loading ? (
              product && (
                <div>
                  <div className="card-header d-flex ">
                    <div>
                      <h4 className="card-title">
                        {product[Object.keys(inputFields)[0]]} -{" "}
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
                          to={`/${LINK_URL}/${product._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>

                    <div className="product-current-status">
                      Product Current Status is: {

                        product && product.product_status === "Active" ? (<strong><i className="fa fa-arrow-circle-up" /> Active</strong>)
                          : (product && product.product_status === "Rejected") ? (<strong><i className="fa fa-arrow-circle-down" /> Rejected</strong>)
                            : (<strong><i className="fa fa-minus-circle" />Pending</strong>)
                      }
                    </div>

                    {user && user.role && user.role == "SUPER ADMIN" ? (
                      <div className="change-status-btn">
                        <button onClick={handleStatusButton} class="button-prod-status prod-status-pending btn-waring" role="button">Change status</button>
                      </div>
                    ) : (
                      null
                    )}


                    {showProductStatusButton ? (
                      <div className="product-status-tabs d-flex ml-26">
                        {product && product.product_status === "Active" ? (
                          <>
                            <div className="product-pending">
                              <button onClick={() => handleProductStatusChange("Pending")} class="button-prod-status prod-status-pending btn-waring" role="button">Pending</button>
                            </div>
                            <div className="product-rejected">
                              <button onClick={() => handleProductStatusChange("Rejected")} class="button-prod-status prod-status-rejected" role="button">Rejected</button>
                            </div>
                          </>
                        ) : (
                          <div className="product-active">
                            <button onClick={() => handleProductStatusChange("Active")} class="button-prod-status prod-status-active" role="button">Active</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      null
                    )}

                  </div>
                  <ProductForm
                    data={product}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_product_loading}
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

export default EditProduct;
