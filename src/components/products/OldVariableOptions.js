import React from "react";
import { SelectBox, TextInput } from "../Form/Form";
import { FieldArray } from "formik";
import { useEffect } from "react";
import { useSelectAllVariation } from "../../shared/hooks/UseVariation"

function VariableOptions({ formik, item, inputFields }) {
    const [variation_data] = useSelectAllVariation()
    const { all_variations } = variation_data;
    console.log("All Variations Option", all_variations);
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
                                    <div className="col-md-12">
                                        <TextInput
                                            label="Option Name"
                                            type="text"
                                            name={`${item}[${fieldIndex}].label`}
                                            placeHolder="Add Option Title (ex. Color, Size, Material)"
                                        />
                                        <SelectBox
                                            label="Option Name"
                                            type="text"
                                            name={`${item}[${fieldIndex}].label`}
                                            onChange={(e) => {
                                                formik.setFieldValue(`${item}[${fieldIndex}].label`, e.target.value);
                                                const filterData = all_variations && all_variations.filter((variation_options) => {
                                                    return variation_options.name === e.target.value
                                                })
                                                formik.setFieldValue(`${item}[${fieldIndex}].options_all`, filterData[0])
                                            }}
                                            placeHolder="Add Option Title (ex. Color, Size, Material)">
                                            <option value=""></option>
                                            {all_variations && all_variations.map((item) => {
                                                return (
                                                    <option value={item.variation_name}> {item.variation_name}</option>
                                                )
                                            })}
                                        </SelectBox>
                                    </div>
                                    <FieldArray name={`${item}[${fieldIndex}].options`}>
                                        {(fieldArrayProps) => {
                                            const { push, remove, form } = fieldArrayProps;
                                            const { values } = form;
                                            const arrayValues2 =
                                                values[item] &&
                                                    values[item][fieldIndex] &&
                                                    values[item][fieldIndex]["options"]
                                                    ? values[item][fieldIndex]["options"]
                                                    : [];
                                            return (
                                                <div
                                                    style={{
                                                        border: "1px solid #f1f1f1",
                                                        margin: "10px 10px",
                                                        padding: "10px",
                                                    }}
                                                >
                                                    <div> Option Values </div>
                                                    {arrayValues2.map((single, fieldIndex2) => (
                                                        <div key={fieldIndex2} className="row">
                                                            <div className="col-md-12">
                                                                <div className="d-flex align-items-center">
                                                                    <div style={{ flex: 1 }}>
                                                                        <TextInput
                                                                            name={`${item}[${fieldIndex}].options[${fieldIndex2}].value`}
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeHolder="Add Value (ex. Red, Blue, Leather)"
                                                                        />

                                                                        {formik.values[item][fieldIndex].options_all ? (
                                                                            <SelectBox
                                                                                name={`${item}[${fieldIndex}].options[${fieldIndex2}].value`}
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeHolder="Add Value (ex. Red, Blue, Leather)"
                                                                            >
                                                                                <option value=""></option>
                                                                                {formik.values[item][fieldIndex].options_all && formik.values[item][fieldIndex].options_all.values.map((option) => {
                                                                                    return (
                                                                                        <option value={option.value}> {option.value} </option>
                                                                                    )
                                                                                })}
                                                                            </SelectBox>
                                                                        ) : (
                                                                            <TextInput
                                                                                name={`${item}[${fieldIndex}].options[${fieldIndex2}].value`}
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeHolder="Add Value (ex. Red, Blue, Leather)"
                                                                            />
                                                                        )}

                                                                    </div>
                                                                    <div>
                                                                        {fieldIndex2 > 0 ? (
                                                                            <a
                                                                                className="btn btn-sm "
                                                                                onClick={() => remove(fieldIndex2)}
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </a>
                                                                        ) : (
                                                                            <a
                                                                                className="btn btn-sm "
                                                                                onClick={() => remove(fieldIndex2)}
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div style={{ float: "right" }}>
                                                        <a
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => push({ value: "" })}
                                                        >
                                                            + Add Value
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </FieldArray>
                                </div>
                            ))}
                            <div style={{ borderTop: "1px solid #f1f1f1" }}>
                                <a
                                    className="btn btn-sm btn-success"
                                    onClick={() =>
                                        push({
                                            label: "",
                                            options: [
                                                {
                                                    value: "",
                                                },
                                            ],
                                        })
                                    }
                                >
                                    + Add Another Option
                                </a>
                            </div>
                        </div>
                    );
                }}
            </FieldArray>
        </>
    );
}

export default VariableOptions;
