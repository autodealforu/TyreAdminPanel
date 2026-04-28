import React from "react";
import { FileUpload, SelectBox, TextInput } from "../Form/Form";
import { FieldArray } from "formik";
import { useEffect } from "react";

function ProductOptions({ formik, item, inputFields, dropdown_options }) {
  console.log(formik);
  console.log("dropdown_options", dropdown_options);
  return (
    <>
      <FieldArray name={item}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const arrayValues = values[item] ? values[item] : [];
          return (
            <div
              style={{
                border: "1px solid #f1f1f1",
                margin: "10px 10px",
                padding: "10px",
              }}
            >
              {arrayValues.map((single, fieldIndex) => (
                <div key={fieldIndex} className="row">
                  <div
                    className="d-flex justify-content-between"
                    style={{
                      background: "#f1f1f1",
                      padding: "10px 10px",
                      marginTop: "0px",
                    }}
                  >
                    <div></div>
                    <div>
                      {fieldIndex > 0 ? (
                        <a
                          className="btn btn-sm btn-danger"
                          onClick={() => remove(fieldIndex)}
                        >
                          -
                        </a>
                      ) : (
                        <a
                          className="btn btn-sm btn-danger"
                          onClick={() => remove(fieldIndex)}
                        >
                          -
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <SelectBox
                      label="Product"
                      name={`${item}[${fieldIndex}].product`}
                    >
                      <option value=""> --none-- </option>
                      {dropdown_options &&
                        dropdown_options.product &&
                        dropdown_options.product.map((item) => {
                          return (
                            <option value={item.value}>{item.label}</option>
                          );
                        })}
                    </SelectBox>
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      label="Product Name"
                      name={`${item}[${fieldIndex}].name`}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      label="Product Slug"
                      name={`${item}[${fieldIndex}].slug`}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      label="Regular Price"
                      name={`${item}[${fieldIndex}].regular_price`}
                      type="number"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      label="Sale Price"
                      name={`${item}[${fieldIndex}].sale_price`}
                      type="number"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      label="Quantity"
                      name={`${item}[${fieldIndex}].quantity`}
                      type="number"
                    />
                  </div>
                  <FileUpload
                    title={"Image"}
                    item={`${item}[${fieldIndex}].image`}
                    formik={formik}
                  />
                </div>
              ))}
              <div style={{ borderTop: "1px solid #f1f1f1" }}>
                <a className="btn btn-sm btn-success" onClick={() => push()}>
                  + Add Another Product
                </a>
              </div>
            </div>
          );
        }}
      </FieldArray>
    </>
  );
}

export default ProductOptions;
