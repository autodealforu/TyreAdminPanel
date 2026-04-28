import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBlogcategory,
  getBlogcategorys,
  getBlogcategory,
  editBlogcategory,
  deleteBlogcategory,
  getAllBlogcategorys,
} from "../../store/actions/blogcategory_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllBlogcategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blogcategory);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteBlogcategory(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getBlogcategorys({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleBlogcategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blogcategory);
  useEffect(() => {
    dispatch(getBlogcategory(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateBlogcategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blogcategory);
  const addData = async (data) => {
    await dispatch(addBlogcategory(data));
  };
  return [data, addData];
};
export const useUpdateBlogcategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.blogcategory);
  const updateData = async (id, data) => {
    await dispatch(editBlogcategory(id, data));
  };
  return [updateData];
};

export const useSelectAllBlogcategory = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.blogcategory);
  useEffect(() => {
    dispatch(getAllBlogcategorys({ term, value }));
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
