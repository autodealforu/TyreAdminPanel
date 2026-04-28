import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  deleteBulkProduct,
} from '../../store/actions/product_action';
import _debounce from 'lodash/debounce';

import { useSelectAllProductcategory } from './UseProductcategory';
import { useSelectAllVendor } from './UseVendor';
import { useSelectAllTyre } from './UseTyre';
import { useSelectAllAlloyWheel } from './UseAlloyWheel';
import { useSelectAllService } from './UseService';
import * as XLSX from 'xlsx';

export const UseExcelExport = () => {
  const exportXLSXData = (data, sheet_name, export_name) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, sheet_name);
    XLSX.writeFile(wb, `${export_name}.xlsx`);
  };
  return [exportXLSXData];
};

// Get All Data
export const useAllProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteProduct(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getProducts({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleProduct = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useBulkDeleteProduct = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const handleDeleteBulkProducts = (products) => {
    dispatch(deleteBulkProduct(products));
  };
  return [handleDeleteBulkProducts];
};
// Add Data
export const useCreateProduct = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const addData = async (data) => {
    await dispatch(addProduct(data));
  };
  return [data, addData];
};
export const useUpdateProduct = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.product);
  const updateData = async (id, data) => {
    await dispatch(editProduct(id, data));
  };
  return [updateData];
};

export const useSelectAllProduct = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [vendor] = useSelectAllVendor();
  const [tyreData] = useSelectAllTyre();
  const [alloyWheelData] = useSelectAllAlloyWheel();
  const [serviceData] = useSelectAllService();

  const [dropdownOptions, setDropdownOptions] = useState({
    vendor: [],
    tyre: [],
    alloy_wheel: [],
    service: [],
  });

  useEffect(() => {
    const newDropdownOptions = { ...dropdownOptions };

    // Vendor options
    if (vendor && vendor.all_vendors) {
      newDropdownOptions.vendor = vendor.all_vendors.map((item) => ({
        label: `${item.name}${item.store_name ? ' - ' + item.store_name : ''}`,
        value: item._id,
      }));
    }

    // Tyre options - create descriptive labels
    if (tyreData && tyreData.all_tyres) {
      console.log('INside ALl Tyres', tyreData?.all_tyres);

      newDropdownOptions.tyre = tyreData.all_tyres.map((item) => ({
        label: `${item.productBrand?.name || ''} ${item.tyreWidth?.name || ''}${
          item?.tyreWidthType === 'IN MM' ? `/${item.aspectRatio?.name}` : ''
        }${item.construction || ''}${item?.rimDiameter?.name} 
                                          ${item?.plyRating?.name} 
                                          ${item?.loadIndex?.name} 
                                          ${item?.speedSymbol?.name} 
                                          ${item?.productThreadPattern?.name} 
                                          ${item?.unit}`,
        value: item._id,
      }));
    }

    // Alloy Wheel options - create descriptive labels
    if (alloyWheelData && alloyWheelData.all_alloywheels) {
      newDropdownOptions.alloy_wheel = alloyWheelData.all_alloywheels.map(
        (item) => ({
          label: `${item.alloyBrand?.name || 'Unknown Brand'} ${
            item.alloyDiameterInches?.name || ''
          }X${item.alloyWidth?.name || ''} ${item.alloyFinish?.name || ''}`,
          value: item._id,
        })
      );
    }

    // Service options
    if (serviceData && serviceData.all_services) {
      newDropdownOptions.service = serviceData.all_services.map((item) => ({
        label: `${item.serviceName} - ${item.serviceShortName || ''}`,
        value: item._id,
      }));
    }

    setDropdownOptions(newDropdownOptions);
  }, [vendor, tyreData, alloyWheelData, serviceData]);

  const loadOptions = async (inputValue, callback, field) => {
    // Implement search functionality if needed
    console.log('inputValue', inputValue, field, callback);
  };

  return [dropdownOptions, loadOptions];
};
