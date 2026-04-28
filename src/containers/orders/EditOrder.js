import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import OrderForm from "../../components/orders/OrderForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL
} from "../../shared/enums/orders_enum";
import { useUpdateOrder, useSingleOrder,useGetDropdownOptions } from "../../shared/hooks/UseOrder";
// import { useSelectAllOrder } from "../../shared/hooks/UseOrder";

const EditOrder = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleOrder(match.params.id);
  const [updateData] = useUpdateOrder();
  const { order_loading, order, edit_order_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);
  
  

  const [dropdownOptions,loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async values => {
    const data = await convertToFormData({ values, featuredImage });
    await updateData(order._id, data);
    history.push(`/${LINK_URL}/${order._id}/view`);
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
            {!order_loading ? (
              order && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {order[Object.keys(inputFields)[0]]} -{" "}
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
                          to={`/${LINK_URL}/${order._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <OrderForm
                    data={order}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_order_loading}
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

export default EditOrder;
