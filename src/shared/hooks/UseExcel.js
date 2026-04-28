import moment from 'moment';
import { useState } from 'react';
import * as XLSX from 'xlsx';

export const UseFilter = () => {
  const exportXLSXData = (data, sheet_name, export_name) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, sheet_name);
    XLSX.writeFile(wb, `${export_name}.xlsx`);
  };
  return [exportXLSXData];
};

export const UseDataForExcel = () => {
  const [exportData, setExportData] = useState([]);
  const convertToReadable = (rawData, inputFields) => {
    if (inputFields) {
      let freshData = [];
      const newFreshData = rawData.map((data, index) => {
        let newItem = {};
        newItem['SR No'] = index + 1;
        Object.keys(inputFields) &&
          Object.keys(inputFields).map((item, index) => {
            if (inputFields[item] && inputFields[item].type === 'string') {
              newItem[inputFields[item].title] =
                inputFields[item].inputType == 'date'
                  ? data[item] && moment(data[item]).format('DD-MMM-YYYY')
                  : inputFields[item].inputType == 'datetime-local'
                  ? moment(data[item]).format('DD-MMM-YYYY hh:mm:ss A')
                  : data[item]
                  ? inputFields[item].preText
                    ? `${inputFields[item].preText}${data[item]}`
                    : data[item]
                  : '';
            }
            if (inputFields[item] && inputFields[item].type === 'text') {
              newItem[item] = data[item]
                ? inputFields[item].preText
                  ? `${inputFields[item].preText}${data[item]}`
                  : data[item]
                : '';
            }
            if (inputFields[item] && inputFields[item].type === 'select') {
              newItem[item] = data[item] ? data[item] : '';
            }
            if (inputFields[item] && inputFields[item].type === 'related') {
              newItem[item] = data[item]
                ? !inputFields[item].static
                  ? inputFields[item].sub_field
                    ? data[item][inputFields[item].field][
                        inputFields[item].sub_field
                      ]
                    : data[item][inputFields[item].field]
                  : data[item]
                : '';
            }
            if (inputFields[item] && inputFields[item].type === 'related-2') {
              newItem[item] = data[item]
                ? !inputFields[item].static
                  ? data[item][inputFields[item].field]
                  : inputFields[item].preText
                  ? `${inputFields[item].preText}${data[item]}`
                  : data[item]
                : '';
            }
            if (inputFields[item] && inputFields[item].type === 'checkbox') {
              newItem[item] = data[item] ? 'YES' : 'NO';
            }
            if (inputFields[item] && inputFields[item].type === 'array_field') {
              newItem[item] = data[item]
                ? inputFields[item].preText
                  ? `${inputFields[item].preText}${data[item][0]}`
                  : data[item][0]
                : '';
            }
          });

        newItem['Created By'] =
          data.created_by && data.created_by.name ? data.created_by.name : '';

        newItem['Updated By'] =
          data.updated_by && data.updated_by.name ? data.updated_by.name : '';

        newItem['Created At'] = data.createdAt
          ? moment(data.createdAt).format('DD-MM-YYYY hh:mm:ss A')
          : '';

        newItem['Updated At'] = data.updatedAt
          ? moment(data.updatedAt).format('DD-MM-YYYY hh:mm:ss A')
          : '';

        return newItem;
      });
      //   console.log(newFreshData);
      setExportData(newFreshData);
    }
  };
  return [convertToReadable, exportData];
};

export const UseVendorDataExport = () => {
  const [exportData, setExportData] = useState([]);
  const convertToReadable = (rawData, inputFields) => {
    if (inputFields) {
      let freshData = [];
      const newFreshData = rawData.map((data, index) => {
        let newItem = {};
        newItem['SR No'] = index + 1;

        newItem['Vendor Name'] = data.name;
        newItem['Phone'] = data.phone;
        newItem['Email'] = data.email;
        newItem['Store Name'] = data.vendor?.store_name;
        newItem['GST'] = data.vendor?.gst_no;
        newItem['Account Number'] = data.vendor?.account_number;
        newItem['Status'] = data.vendor?.profile_status;
        newItem['Address'] = `${
          data.vendor?.pickup_address[0]?.address_1 ?? ''
        } ${data.vendor?.pickup_address[0]?.address_2 ?? ''} ${
          data.vendor?.pickup_address[0]?.city ?? ''
        } ${data.vendor?.pickup_address[0]?.state ?? ''} ${
          data.vendor?.pickup_address[0]?.pin ?? ''
        } `;

        return newItem;
      });
      //   console.log(newFreshData);
      setExportData(newFreshData);
    }
  };
  return [convertToReadable, exportData];
};
