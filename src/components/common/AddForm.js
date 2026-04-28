import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import EditorWYSIWYG from "../EditorWYSIWYG";
import * as Yup from "yup";
import { CheckBox, SelectBox, TextArea, TextInput } from "../Form/Form";
import slugify from "react-slugify";
import { useHistory } from "react-router-dom";
import FormComponents from "./FormComponents";
import moment from "moment";
function AddForm({
  data,
  edit,
  submitForm,
  setFeaturedImage,
  setGallery,
  inputFields,
  initialValues,
  dropdown_options,
  loadOptions,
}) {
  let history = useHistory();

  const [requiredCheck, setRequiredCheck] = useState({});
  const [customData, setCustomData] = useState(null);
  useEffect(() => {
    if (inputFields) {
      if (Object.keys(inputFields)) {
        const newRequiredCheck = {};
        Object.keys(inputFields).map((item, index) => {
          if (inputFields[item].required) {
            console.log(item);
            newRequiredCheck[item] = Yup.string().required("Required");
          }
        });

        setRequiredCheck(newRequiredCheck);
      }
    }
  }, []);
  // console.log(requiredCheck);
  useEffect(() => {
    if (data) {
      if (inputFields) {
        if (Object.keys(inputFields)) {
          const newDataCheck = {};
          Object.keys(inputFields).map((item, index) => {
            if (
              inputFields[item] &&
              inputFields[item].type === "string" &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              if (inputFields[item].inputType === "datetime-local") {
                newDataCheck[item] = moment(data[item]).format(
                  "yyyy-MM-DDThh:mm"
                );
              } else {
                if (inputFields[item].inputType === "date") {
                  newDataCheck[item] = moment(data[item]).format("yyyy-MM-DD");
                } else {
                  newDataCheck[item] = data[item];
                }
              }
            }
            if (
              inputFields[item] &&
              inputFields[item].type === "text" &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === "checkbox" &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === "html" &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === "select" &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item];
            }
            if (
              inputFields[item] &&
              inputFields[item].type === "related" &&
              !inputFields[item].hide
            ) {
              // console.log(item);
              newDataCheck[item] = data[item]
                ? !inputFields[item].static
                  ? data[item]._id
                  : data[item]
                : "";
            }
            if (inputFields[item] && inputFields[item].type === "array") {
              newDataCheck[item] = data[item];
            }
          });
          setCustomData(newDataCheck);
        }
      }
    }
  }, [data]);
  // console.log("CUSTOM DATA", customData);
  return (
    <div className="card-body">
      {edit ? (
        customData && (
          <div className="row">
            <Formik
              initialValues={customData ? customData : initialValues}
              validationSchema={Yup.object(requiredCheck)}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                await submitForm(values);
                setSubmitting(false);
                resetForm(true);
              }}
            >
              {(formik) => {
                console.log(formik);
                return (
                  <FormComponents
                    formik={formik}
                    inputFields={inputFields}
                    setFeaturedImage={setFeaturedImage}
                    dropdown_options={dropdown_options}
                    setGallery={setGallery}
                    edit={edit}
                    loadOptions={loadOptions}
                  />
                );
              }}
            </Formik>
          </div>
        )
      ) : (
        <div className="row">
          <Formik
            initialValues={customData ? customData : initialValues}
            validationSchema={Yup.object(requiredCheck)}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              // console.log(formik);
              return (
                <FormComponents
                  formik={formik}
                  inputFields={inputFields}
                  setFeaturedImage={setFeaturedImage}
                  dropdown_options={dropdown_options}
                  setGallery={setGallery}
                  edit={edit}
                  loadOptions={loadOptions}
                />
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default AddForm;
