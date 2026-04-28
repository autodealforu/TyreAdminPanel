import { Form, Formik } from "formik";
import React from "react";
import { SelectBox, TextInput } from "../../components/Form/Form";
import * as Yup from "yup";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import MenuReorder from "../../components/menus/MenuReorder";

function Menu() {
  return (
    <div className="pace-done">
      <Header />
      <BreadCrumb
        title={`Menus`}
        mainLinkTitle={"Menu"}
        mainLinkUrl={"/dashboard"}
        activeLink="Configure"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="card-title"> Select Menu </h4>
                  </div>
                  <div>
                    <div className="d-flex">
                      <label> Selected Menu </label>
                      <select className="form-control">
                        <option value={""}> Select One </option>
                        <option value="Option 1">Option 1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <MenuReorder />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Menu </h4>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={{
                    name: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Required"),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

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
                              label="Menu Name"
                              name="name"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <button className="btn btn-success mt-2">
                              Create Menu
                            </button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Select Menu </h4>
              </div>
              <div className="card-body">
                <div>
                  <div>Main Menu</div>
                  <div>
                    <Formik
                      initialValues={{
                        menu: "",
                      }}
                      validationSchema={Yup.object({
                        menu: Yup.string().required("Required"),
                      })}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        setSubmitting(true);

                        resetForm();
                        setSubmitting(false);
                      }}
                    >
                      {(formik) => {
                        console.log(formik);
                        return (
                          <Form>
                            <SelectBox name="menu">
                              <option value=""> --none-- </option>
                            </SelectBox>
                            <div className="row">
                              <div className="col-md-12">
                                <button className="btn btn-success mt-2">
                                  Save Menu
                                </button>
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
                <div>
                  <div>Footer Menu</div>
                  <div>
                    <Formik
                      initialValues={{
                        menu: "",
                      }}
                      validationSchema={Yup.object({
                        menu: Yup.string().required("Required"),
                      })}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        setSubmitting(true);

                        resetForm();
                        setSubmitting(false);
                      }}
                    >
                      {(formik) => {
                        console.log(formik);
                        return (
                          <Form>
                            <SelectBox name="menu">
                              <option value=""> --none-- </option>
                            </SelectBox>
                            <div className="row">
                              <div className="col-md-12">
                                <button className="btn btn-success mt-2">
                                  Save Menu
                                </button>
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
