import React, { useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from "../../shared/enums/customers_enum";
import SingleView from "../../components/common/SingleView";
import {
  useSingleCustomer,
  useUpdateCustomer,
} from "../../shared/hooks/UseCustomer";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { SelectBox, TextInput } from "../../components/Form/Form";
import { useState } from "react";
import AddressCard from "../../components/customers/AddressCard";
const ViewCustomer = ({ match }) => {
  const [data] = useSingleCustomer(match.params.id);
  const { customer_loading, customer } = data;
  const [updateData] = useUpdateCustomer();
  const [editAddressID, setEditAddressID] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="View"
        />
        {!customer_loading ? (
          customer && (
            <SingleView
              data={customer}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={customer._id}
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
              col={8}
            >
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Change Password</h4>
                </div>
                <div className="card-body">
                  <Formik
                    initialValues={{
                      password: "",
                      confirm_password: "",
                    }}
                    validationSchema={Yup.object({
                      password: Yup.string().required("Required"),
                      confirm_password: Yup.string().oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match"
                      ),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      setSubmitting(true);
                      await updateData(match.params.id, values);
                      resetForm();
                      setSubmitting(false);
                    }}
                  >
                    {(formik) => {
                      console.log(formik);
                      return (
                        <Form>
                          <div className="row">
                            <div className="col-md-12">
                              <TextInput
                                label="Password"
                                name="password"
                                type="password"
                              />
                            </div>
                            <div className="col-md-12">
                              <TextInput
                                label="Confirm Password"
                                name="confirm_password"
                                type="password"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 text-center m-3">
                              <button type="submit" className="btn btn-success">
                                {formik.isSubmitting ? "Processing..." : "Save"}
                              </button>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
              {customer.address &&
                customer.address.map((item, index) => {
                  return (
                    <>
                      {editAddressID &&
                      editAddressID === item._id &&
                      selectedAddress ? (
                        <div className="card">
                          <div className="card-header">
                            <div className="d-flex justify-content-between">
                              <div>
                                <strong>Edit Address {index + 1}</strong>{" "}
                              </div>
                              <div>
                                {" "}
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => setEditAddressID(null)}
                                >
                                  {" "}
                                  <i className="fa fa-minus"></i>
                                </button>{" "}
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <Formik
                              initialValues={{
                                address_1: selectedAddress.address_1,
                                address_2: selectedAddress.address_2,
                                city: selectedAddress.city,
                                state: selectedAddress.state,
                                landmark: selectedAddress.landmark,
                                pin: selectedAddress.pin,
                              }}
                              validationSchema={Yup.object({
                                address_1: Yup.string().required("Required"),
                                city: Yup.string().required("Required"),
                                state: Yup.string().required("Required"),
                                pin: Yup.string().required("Required"),
                              })}
                              onSubmit={async (
                                values,
                                { setSubmitting, resetForm }
                              ) => {
                                setSubmitting(true);
                                const mappedAddress = customer.address.map(
                                  (item) => {
                                    if (item._id == editAddressID) {
                                      return values;
                                    }
                                  }
                                );
                                await updateData(match.params.id, {
                                  address: mappedAddress,
                                });
                                resetForm();
                                setSubmitting(false);
                              }}
                            >
                              {(formik) => {
                                console.log(formik);
                                return <AddressCard formik={formik} />;
                              }}
                            </Formik>
                          </div>
                        </div>
                      ) : (
                        <div className="card">
                          <div className="card-header">
                            <div className="d-flex justify-content-between">
                              <div>
                                <strong>Address {index + 1}</strong>{" "}
                              </div>
                              <div>
                                {" "}
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => {
                                    setEditAddressID(item._id);
                                    setSelectedAddress(item);
                                  }}
                                >
                                  {" "}
                                  <i className="fa fa-edit"></i>
                                </button>{" "}
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div>
                              <p>
                                {" "}
                                Address 1: {item.address_1} {item.address_2}{" "}
                              </p>
                              <p> Landmark : {item.landmark} </p>
                              <p> City : {item.city} </p>
                              <p> State : {item.state} </p>
                              <p> Pincode : {item.pin} </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </SingleView>
          )
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCustomer;
