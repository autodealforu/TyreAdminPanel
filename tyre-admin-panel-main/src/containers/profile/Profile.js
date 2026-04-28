import React from "react";
import { connect } from "react-redux";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import {
  CheckBox,
  SelectBox,
  TextArea,
  TextInput,
} from "../../components/Form/Form";
import { updateProfile } from "../../store/actions/auth";
import AlertBox from "../../components/template/AlertBox";
const MyProfile = ({ auth: { user }, alert, updateProfile }) => {
  return (
    <div>
      <Header></Header>

      <BreadCrumb
        title="Dashboard"
        mainLinkTitle="Dashboard"
        mainLinkUrl=""
        activeLink="Main"
      />
      <section class=" about-us">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div
                className="card about-page-cntent"
                style={{
                  padding: "30px 0px",
                  border: "1px solid #f1f1f1",
                  padding: "10px 20px",
                  margin: "5px 0px",
                }}
              >
                <div className=" create-new-account">
                  <h3 class="page-subheading">Reset Password</h3>
                  {user && (
                    <Formik
                      initialValues={{
                        newPassword: "",
                        confirmPassword: "",
                      }}
                      validationSchema={Yup.object({
                        newPassword: Yup.string().required("Required"),
                        confirmPassword: Yup.string()
                          .required("Required")
                          .oneOf(
                            [Yup.ref("newPassword"), null],
                            "Passwords must match"
                          ),
                      })}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        setSubmitting(true);

                        await updateProfile({ password: values.newPassword });
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
                                  label="New Password"
                                  name="newPassword"
                                  type="password"
                                  placeholder="Enter New Password"
                                />
                              </div>
                              <div className="col-md-12">
                                <TextInput
                                  label="Confirm Password"
                                  name="confirmPassword"
                                  type="password"
                                  placeholder="Enter Confirm Password"
                                />
                              </div>
                              <div className="mt-4">
                                {alert &&
                                  alert.map((item) => {
                                    return (
                                      <p className={`text-${item.alertType}`}>
                                        {" "}
                                        {item.msg}{" "}
                                      </p>
                                    );
                                  })}
                              </div>
                              <div className="mt-4">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  {formik.isSubmitting
                                    ? "Saving..."
                                    : "Change Password"}
                                </button>
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AlertBox />
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth, alert: state.alert });

const mapDispatchToProps = { updateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
