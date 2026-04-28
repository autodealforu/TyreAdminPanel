import React, { useEffect } from 'react';
import { CheckBox, GalleryUpload, TextInput } from '../Form/Form';
import { FieldArray } from 'formik';
import 'lodash.combinations';
import _, { some } from 'lodash';

function VariationTable({ formik, item }) {
  const combineObjects = ([head, ...[headTail, ...tailTail]]) => {
    if (!headTail) return head;

    const combined = headTail.reduce((acc, x) => {
      return acc.concat(head.map((h) => ({ ...h, ...x })));
    }, []);

    return combineObjects([combined, ...tailTail]);
  };

  useEffect(() => {
    if (formik.values.variation_attrs) {
      let freshArrayToIterate = formik.values.variation_attrs.map((item) => {
        let newObjectValues = [];
        item.options.map((sub_item) => {
          let someObject = {};
          someObject[item.label] = sub_item.value;
          newObjectValues.push(someObject);
        });
        return newObjectValues;
      });
      let newArrayToCheck = [];
      freshArrayToIterate.map((item) => {
        newArrayToCheck.push(item);
      });
      const freshArrayToObject = combineObjects(newArrayToCheck);
      console.log('Somnehting', freshArrayToObject);

      let newArrayToAdd =
        freshArrayToObject &&
        freshArrayToObject.map((item, options_index) => {
          const keys = Object.keys(item);
          console.log(keys);
          let options = [];
          keys.map((key) => {
            let someKey = {
              label: key,
              value: item[key],
            };
            options.push(someKey);
          });

          item.regular_price =
            formik.values['variations'] &&
            formik.values['variations'][options_index] &&
            formik.values['variations'][options_index].regular_price
              ? formik.values['variations'][options_index].regular_price
              : formik.values.regular_price
              ? formik.values.regular_price
              : '';
          item.sale_price =
            formik.values['variations'] &&
            formik.values['variations'][options_index] &&
            formik.values['variations'][options_index].sale_price
              ? formik.values['variations'][options_index].sale_price
              : formik.values.sale_price
              ? formik.values.sale_price
              : '';
          item.options = options;
          item.in_stock = true;
          item.media =
            formik.values['variations'] &&
            formik.values['variations'][options_index] &&
            formik.values['variations'][options_index].media
              ? formik.values['variations'][options_index].media
              : [];
          item.sku = formik.values.sku
            ? `${formik.values.sku}-${options_index + 1}`
            : '';
          return item;
        });

      console.log('Varations', newArrayToAdd);

      formik.setFieldValue('variations', newArrayToAdd);
    }
  }, [formik.values.variation_attrs]);

  return (
    <div>
      <div> Variants </div>

      <FieldArray name={item}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const arrayValues = values[item] ? values[item] : [];
          return (
            <div>
              <div
                style={{
                  border: '1px solid #f1f1f1',
                  margin: '10px 10px',
                  padding: '10px',
                }}
              >
                {arrayValues.map((single, fieldIndex) => (
                  <div key={fieldIndex} className='row'>
                    <div className='col-md-12'>
                      <div
                        className='d-flex align-items-center '
                        style={{
                          gap: '20px',
                          borderTop: '1px solid #f1f1f1',
                          padding: '10px 10px',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div>
                            {' '}
                            {formik.values[item] &&
                              formik.values[item][fieldIndex] &&
                              formik.values[item][fieldIndex].options &&
                              formik.values[item][fieldIndex].options.map(
                                (option, option_index) => {
                                  return (
                                    <span>
                                      {' '}
                                      {option.value}{' '}
                                      {option_index !==
                                        formik.values[item][fieldIndex].options
                                          .length -
                                          1 && '/'}
                                    </span>
                                  );
                                }
                              )}{' '}
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <TextInput
                            type='text'
                            name={`${item}[${fieldIndex}].regular_price`}
                            placeHolder='Price'
                          />
                        </div>
                        {formik.values[item][fieldIndex] && (
                          <div style={{ flex: 1 }}>
                            <TextInput
                              type='text'
                              name={`${item}[${fieldIndex}].sale_price`}
                              placeHolder='Sale Price'
                            />
                          </div>
                        )}{' '}
                        <div style={{ flex: 1 }}>
                          <TextInput
                            type='text'
                            name={`${item}[${fieldIndex}].sku`}
                            placeHolder='SKU'
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          {console.log(
                            'MEDIA',
                            formik.values[item][fieldIndex].media
                          )}
                          <GalleryUpload
                            title={'Media'}
                            item={`${item}[${fieldIndex}].media`}
                            formik={formik}
                            value={formik.values[item][fieldIndex].media}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <CheckBox
                            label={'In Stock'}
                            name={`${item}[${fieldIndex}].in_stock`}
                            // placeHolder="SKU"
                          >
                            In Stock
                          </CheckBox>
                        </div>
                        <div style={{ flex: 1 }}>
                          <TextInput
                            type='number'
                            name={`${item}[${fieldIndex}].stock`}
                            placeHolder='Stock'
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          {fieldIndex > 0 ? (
                            <a
                              className='btn btn-sm btn-danger'
                              onClick={() => remove(fieldIndex)}
                            >
                              -
                            </a>
                          ) : (
                            <a
                              className='btn btn-sm btn-danger'
                              onClick={() => remove(fieldIndex)}
                            >
                              -
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
}

export default VariationTable;
