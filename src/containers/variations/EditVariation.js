import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
    TextInput,
    HTMLEditor,
    FileUpload,
} from "../../components/Form/Form";
import { useCreateVariation, useGetVariation } from "../../shared/hooks/UseVariation.js"

const EditVariation = ({ }) => {
    const [variation, addVariation] = useCreateVariation();
    const { variations, loading } = variation


    const submitFormClicked = async (values) => {
        // history.push(`/`);
    };

    return (
        <div className="pace-done">
            <div>
                <Header />
                <BreadCrumb
                    title={`Variations`}
                    mainLinkTitle={"Variations"}
                    mainLinkUrl={"/dashboard"}
                    activeLink="Home"
                />
            </div>
            <div>
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {
                                    //     !loading && variations && (
                                    // )
                                }
                                <Formik
                                    initialValues={{
                                        variation_name: variations.variation_name ? variations.variation_name : "",
                                        variation_values: [{
                                            value: ""
                                        }]

                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().required("Required"),
                                    })}
                                    onSubmit={async (
                                        values,
                                        { setSubmitting, resetForm }
                                    ) => {
                                        setSubmitting(true);
                                        await addVariation(values);
                                        resetForm();
                                        setSubmitting(false);
                                    }}
                                >
                                    {(formik) => {
                                        console.log(formik);
                                        return (
                                            <>
                                                <section>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <h4 className="card-title">
                                                                Variation
                                                            </h4>
                                                            <p className="card-title-description">
                                                                Enter Details to add Variation
                                                            </p>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <Form>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <TextInput
                                                                                label="Name"
                                                                                name="name"
                                                                                type="text"
                                                                                placeholder="Enter Name"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <FieldArray
                                                                        label="Variation Value"
                                                                        name="variation_values"
                                                                        render={(arrayHelpers) => (
                                                                            <div>
                                                                                {formik.values.variation_values.map((variation_value, index) => (
                                                                                    <div key={index}>

                                                                                        <div className="d-flex justify-content-between" style={{
                                                                                            background: "#f1f1f1", padding
                                                                                                : "10px 10px",
                                                                                            marginBottom: "10px",
                                                                                            marginTop: "10px"
                                                                                        }}>
                                                                                            <div className="label-featu" >
                                                                                                Variation Value {index + 1}
                                                                                            </div>
                                                                                            <div className="closebtn">
                                                                                                <a onClick={() => arrayHelpers.remove(index)}>
                                                                                                    X
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <TextInput
                                                                                                label="Value"
                                                                                                name={`variation_values[${index}].value`}
                                                                                                formik={formik}
                                                                                                value={formik.values.variation_values[index].value}
                                                                                            />
                                                                                        </div>



                                                                                    </div>
                                                                                ))}
                                                                                <button

                                                                                    className="btn primary-btn btn btn-warning mt-3"
                                                                                    onClick={() => arrayHelpers.push({ value: '' })}
                                                                                >
                                                                                    + Add Variation Value
                                                                                </button>

                                                                            </div>
                                                                        )}
                                                                    />

                                                                    <div className="row">
                                                                        <div className="col-md-12 text-center m-3">
                                                                            <button type="submit" className="btn btn-success">
                                                                                {formik.isSubmitting
                                                                                    ? 'Processing...'
                                                                                    : 'Save'}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditVariation;
