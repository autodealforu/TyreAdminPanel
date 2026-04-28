import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addVendor,
  getVendors,
  getVendor,
  editVendor,
  deleteVendor,
  getAllVendors,
  addPickupAddressVendor,
} from '../../store/actions/vendor_action';
import _debounce from 'lodash/debounce';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllVendors = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vendor);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteVendor(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getVendors({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleVendor = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vendor);
  useEffect(() => {
    dispatch(getVendor(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useAddPickupAddressVendor = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vendor);
  const updatePickupAddress = (id) => {
    dispatch(addPickupAddressVendor(id));
  };
  return [updatePickupAddress, data];
};
// Add Data
export const useCreateVendor = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vendor);
  const addData = async (data) => {
    await dispatch(addVendor(data));
  };
  return [data, addData];
};
export const useUpdateVendor = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.vendor);
  const updateData = async (id, data) => {
    await dispatch(editVendor(id, data));
  };
  return [updateData];
};

export const useSelectAllVendor = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.vendor);
  useEffect(() => {
    dispatch(getAllVendors({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  //  const [client, setClientSearchField, setClientSearchValue] =
  // useSelectAllClient();

  const [dropdownOptions, setDropdownOptions] = useState({});
  // useEffect(() => {
  //   if (industry && industry.all_industrys) {
  //     const newData = industry.all_industrys.map((item) => {
  //       return { label: item.name, value: item.name };
  //     });
  //     setDropdownOptions({ ...dropdownOptions, industry: newData });
  //   }
  // }, [industry]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
