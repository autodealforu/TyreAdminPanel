import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  getCategorys,
  getCategory,
  editCategory,
  deleteCategory,
  getAllCategorys,
} from "../../store/actions/category_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllCategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteCategory(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getCategorys({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleCategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategory(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category);
  const addData = async (data) => {
    await dispatch(addCategory(data));
  };
  return [data, addData];
};
export const useUpdateCategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.category);
  const updateData = async (id, data) => {
    await dispatch(editCategory(id, data));
  };
  return [updateData];
};

export const useSelectAllCategory = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllCategorys({ term, value }));
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
