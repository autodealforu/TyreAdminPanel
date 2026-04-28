import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBlog,
  getBlogs,
  getBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
} from "../../store/actions/blog_action";
import _debounce from "lodash/debounce";
import { useSelectAllCategory } from "./UseCategory";

// Get All Data
export const useAllBlogs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteBlog(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getBlogs({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleBlog = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getBlog(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateBlog = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  const addData = async (data) => {
    await dispatch(addBlog(data));
  };
  return [data, addData];
};
export const useUpdateBlog = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.blog);
  const updateData = async (id, data) => {
    await dispatch(editBlog(id, data));
  };
  return [updateData];
};

export const useSelectAllBlog = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getAllBlogs({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [category, setBCategorySearchField, setCategorySearchValue] =
    useSelectAllCategory();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (category && category.all_categorys) {
      const newData = category.all_categorys.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, category: newData });
    }
  }, [category]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
