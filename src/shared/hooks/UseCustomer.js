import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCustomer,
  getCustomers,
  getCustomer,
  editCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../../store/actions/customer_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllCustomers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteCustomer(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getCustomers({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleCustomer = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getCustomer(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateCustomer = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer);
  const addData = async (data) => {
    await dispatch(addCustomer(data));
  };
  return [data, addData];
};
export const useUpdateCustomer = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.customer);
  const updateData = async (id, data) => {
    await dispatch(editCustomer(id, data));
  };
  return [updateData];
};

export const useSelectAllCustomer = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getAllCustomers({ term, value }));
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
