import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTemplate,
  getTemplates,
  getTemplate,
  editTemplate,
  deleteTemplate,
  getAllTemplates,
} from "../../store/actions/template_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllTemplates = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.template);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteTemplate(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getTemplates({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleTemplate = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.template);
  useEffect(() => {
    dispatch(getTemplate(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateTemplate = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.template);
  const addData = async (data) => {
    await dispatch(addTemplate(data));
  };
  return [data, addData];
};
export const useUpdateTemplate = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.template);
  const updateData = async (id, data) => {
    await dispatch(editTemplate(id, data));
  };
  return [updateData];
};

export const useSelectAllTemplate = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.template);
  useEffect(() => {
    dispatch(getAllTemplates({ term, value }));
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
