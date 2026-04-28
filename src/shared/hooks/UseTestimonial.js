import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTestimonial,
  getTestimonials,
  getTestimonial,
  editTestimonial,
  deleteTestimonial,
  getAllTestimonials,
} from "../../store/actions/testimonial_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllTestimonials = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.testimonial);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteTestimonial(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getTestimonials({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleTestimonial = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.testimonial);
  useEffect(() => {
    dispatch(getTestimonial(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateTestimonial = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.testimonial);
  const addData = async (data) => {
    await dispatch(addTestimonial(data));
  };
  return [data, addData];
};
export const useUpdateTestimonial = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.testimonial);
  const updateData = async (id, data) => {
    await dispatch(editTestimonial(id, data));
  };
  return [updateData];
};

export const useSelectAllTestimonial = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.testimonial);
  useEffect(() => {
    dispatch(getAllTestimonials({ term, value }));
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
